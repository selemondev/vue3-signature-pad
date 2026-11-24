import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { VueSignaturePad } from "../index";
import type { Point, WaterMarkObj } from "../types";

interface ExposedPad {
	saveSignature: (format?: string, quality?: number) => string;
	clearCanvas: () => void;
	addWaterMark: (data: unknown) => void;
	isCanvasEmpty: () => boolean;
	fromDataURL: (url: string) => void;
	toDataURL: (type: string, ...options: unknown[]) => string;
	resizeCanvas: () => void;
	undo: () => void;
}

interface MockSignaturePadInstance {
	_isEmpty: boolean;
	backgroundColor: string;
	penColor: string;
	minWidth?: number;
	maxWidth?: number;
	isEmpty: ReturnType<typeof vi.fn<() => boolean>>;
	toDataURL: ReturnType<
		typeof vi.fn<(type?: string, encoderOptions?: unknown) => string>
	>;
	clear: ReturnType<typeof vi.fn<() => void>>;
	fromDataURL: ReturnType<typeof vi.fn<(url: string) => void>>;
	toData: ReturnType<typeof vi.fn<() => Point[][]>>;
	fromData: ReturnType<typeof vi.fn<(data: Point[][]) => void>>;
	addEventListener: ReturnType<
		typeof vi.fn<
			(
				type: string,
				listener: (event: Event) => void,
				options?: { once?: boolean },
			) => void
		>
	>;
	on: ReturnType<typeof vi.fn<() => void>>;
	off: ReturnType<typeof vi.fn<() => void>>;
	__listeners: Record<string, (event: Event) => void>;
}

const {
	setTransformMock,
	fillTextMock,
	strokeTextMock,
	signaturePadInstances,
} = vi.hoisted(() => ({
	setTransformMock: vi.fn(),
	fillTextMock: vi.fn(),
	strokeTextMock: vi.fn(),
	signaturePadInstances: [] as MockSignaturePadInstance[],
}));

vi.mock("signature_pad", () => ({
	default: vi.fn(function MockSignaturePad() {
		const instance: MockSignaturePadInstance = {
			_isEmpty: true,
			backgroundColor: "",
			penColor: "",
			minWidth: undefined,
			maxWidth: undefined,
			isEmpty: vi.fn(function isEmpty() {
				return instance._isEmpty;
			}),
			toDataURL: vi.fn((type?: string) =>
				type ? `data:${type}` : "data:default",
			),
			clear: vi.fn(() => {
				instance._isEmpty = true;
			}),
			fromDataURL: vi.fn(() => {
				instance._isEmpty = false;
			}),
			toData: vi.fn(() => []),
			fromData: vi.fn((data: Point[][]) => {
				instance._isEmpty = data.length === 0;
			}),
			addEventListener: vi.fn(
				(type: string, listener: (event: Event) => void) => {
					instance.__listeners[type] = listener;
				},
			),
			on: vi.fn(),
			off: vi.fn(),
			__listeners: {},
		};
		signaturePadInstances.push(instance);
		return instance;
	}),
}));

const wrappers: VueWrapper[] = [];

function createPoint(x: number, y: number): Point {
	return {
		x,
		y,
		time: Date.now(),
		distanceTo: () => 0,
		velocityFrom: () => 0,
	};
}

async function mountPad(
	props: Record<string, unknown> = {},
): Promise<VueWrapper<ExposedPad>> {
	const host = document.createElement("div");
	document.body.appendChild(host);

	const wrapper = mount(VueSignaturePad, {
		attachTo: host,
		props,
	}) as VueWrapper<ExposedPad>;

	wrappers.push(wrapper);
	await nextTick();
	return wrapper;
}

function getSignaturePad(): MockSignaturePadInstance {
	const instance = signaturePadInstances.at(-1);
	if (!instance) {
		throw new Error("SignaturePad mock was not created.");
	}
	return instance;
}

beforeEach(() => {
	signaturePadInstances.length = 0;
	setTransformMock.mockReset();
	fillTextMock.mockReset();
	strokeTextMock.mockReset();

	vi.spyOn(
		HTMLCanvasElement.prototype,
		"getBoundingClientRect",
	).mockReturnValue({
		width: 320,
		height: 160,
		top: 0,
		left: 0,
		right: 320,
		bottom: 160,
		x: 0,
		y: 0,
		toJSON: () => ({}),
	} as DOMRect);

	vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
		setTransform: setTransformMock,
		fillText: fillTextMock,
		strokeText: strokeTextMock,
		font: "",
		fillStyle: "",
		strokeStyle: "",
	} as unknown as CanvasRenderingContext2D);

	Object.defineProperty(window, "devicePixelRatio", {
		value: 2,
		configurable: true,
	});
});

afterEach(() => {
	while (wrappers.length) {
		wrappers.pop()?.unmount();
	}
	vi.restoreAllMocks();
});

describe("VueSignaturePad", () => {
	it("re-exports the component from the package entry", async () => {
		const entry = await import("../index");

		expect(entry.VueSignaturePad).toBeDefined();
	});

	it("initializes the signature pad and proxies exposed methods", async () => {
		const wrapper = await mountPad({
			disabled: true,
			defaultUrl: "data:image/png;base64,initial",
		});

		const signaturePad = getSignaturePad();

		expect(signaturePad.off).toHaveBeenCalledTimes(1);
		expect(signaturePad.on).not.toHaveBeenCalled();
		expect(signaturePad.fromDataURL).toHaveBeenCalledWith(
			"data:image/png;base64,initial",
		);

		signaturePad.isEmpty.mockReturnValueOnce(true);

		expect(wrapper.vm.isCanvasEmpty()).toBe(true);
		expect(wrapper.vm.saveSignature()).toBe("data:default");
		expect(wrapper.vm.saveSignature("image/jpeg", 0.6)).toBe("data:image/jpeg");
		expect(wrapper.vm.toDataURL("image/svg+xml")).toBe("data:image/svg+xml");

		wrapper.vm.fromDataURL("data:image/png;base64,manual");
		wrapper.vm.clearCanvas();

		expect(signaturePad.fromDataURL).toHaveBeenCalledWith(
			"data:image/png;base64,manual",
		);
		expect(signaturePad.clear).toHaveBeenCalled();
	});

	it("updates signature options and supports undo", async () => {
		const wrapper = await mountPad();
		const signaturePad = getSignaturePad();
		const pointGroups: Point[][] = [[createPoint(1, 1)], [createPoint(2, 2)]];

		signaturePad.toData.mockReturnValue(pointGroups);

		wrapper.vm.undo();

		expect(signaturePad.fromData).toHaveBeenCalledWith([pointGroups[0]]);

		await wrapper.setProps({
			options: {
				penColor: "#123456",
				backgroundColor: "#ffffff",
			},
			minWidth: 1,
			maxWidth: 4,
		});

		expect(signaturePad.penColor).toBe("#123456");
		expect(signaturePad.backgroundColor).toBe("#ffffff");
		expect(signaturePad.minWidth).toBe(1);
		expect(signaturePad.maxWidth).toBe(4);
	});

	it("emits stroke lifecycle events with the signature instance", async () => {
		const wrapper = await mountPad();
		const signaturePad = getSignaturePad();

		signaturePad.__listeners.beginStroke(new Event("beginStroke"));
		signaturePad.__listeners.endStroke(new Event("endStroke"));
		signaturePad.__listeners.beforeUpdateStroke(
			new Event("beforeUpdateStroke"),
		);
		signaturePad.__listeners.afterUpdateStroke(new Event("afterUpdateStroke"));

		expect(wrapper.emitted("beginStroke")?.[0]).toEqual([signaturePad]);
		expect(wrapper.emitted("endStroke")?.[0]).toEqual([signaturePad]);
		expect(wrapper.emitted("beforeUpdateStroke")?.[0]).toEqual([signaturePad]);
		expect(wrapper.emitted("afterUpdateStroke")?.[0]).toEqual([signaturePad]);
	});

	it("adds a watermark and rejects invalid watermark data", async () => {
		const wrapper = await mountPad();
		const signaturePad = getSignaturePad();
		const waterMark: WaterMarkObj = {
			text: "Signed",
			font: "18px serif",
			style: "all",
			fillStyle: "#111111",
			strokeStyle: "#222222",
			x: 12,
			y: 24,
			sx: 36,
			sy: 48,
		};

		wrapper.vm.addWaterMark(waterMark);

		expect(fillTextMock).toHaveBeenCalledWith("Signed", 12, 24);
		expect(strokeTextMock).toHaveBeenCalledWith("Signed", 36, 48);
		expect(signaturePad._isEmpty).toBe(false);
		expect(() =>
			wrapper.vm.addWaterMark("invalid" as unknown as WaterMarkObj),
		).toThrow("Expected Object, got string.");
	});

	it("rescales the saved image on resize when scaleOnResize is enabled", async () => {
		const wrapper = await mountPad({
			scaleOnResize: true,
			clearOnResize: false,
			waterMark: {
				text: "Watermark",
				font: "16px sans-serif",
				style: "stroke",
				fillStyle: "#333333",
				strokeStyle: "#444444",
				x: 10,
				y: 20,
				sx: 30,
				sy: 40,
			},
		});
		const signaturePad = getSignaturePad();

		signaturePad.isEmpty.mockReturnValue(false);
		signaturePad.toDataURL.mockClear();
		signaturePad.fromDataURL.mockClear();
		strokeTextMock.mockClear();

		wrapper.vm.resizeCanvas();

		expect(signaturePad.toDataURL).toHaveBeenCalledWith();
		expect(signaturePad.fromDataURL).toHaveBeenCalledWith("data:default");
		expect(strokeTextMock).toHaveBeenCalledWith("Watermark", 30, 40);
	});

	it("restores stroke data on resize without scaling and honors clearOnResize", async () => {
		const wrapper = await mountPad({
			scaleOnResize: false,
			clearOnResize: false,
		});
		const signaturePad = getSignaturePad();
		const pointGroups: Point[][] = [[createPoint(10, 10)]];

		signaturePad.isEmpty.mockReturnValue(false);
		signaturePad.toData.mockReturnValue(pointGroups);

		wrapper.vm.resizeCanvas();

		expect(signaturePad.toData).toHaveBeenCalled();
		expect(signaturePad.fromData).toHaveBeenCalledWith(pointGroups);

		signaturePad.fromData.mockClear();

		await wrapper.setProps({
			scaleOnResize: false,
			clearOnResize: true,
		});

		wrapper.vm.resizeCanvas();

		expect(signaturePad.fromData).not.toHaveBeenCalled();
	});

	it("reacts to disabled prop updates", async () => {
		const wrapper = await mountPad();
		const signaturePad = getSignaturePad();

		signaturePad.on.mockClear();
		signaturePad.off.mockClear();

		await wrapper.setProps({ disabled: true });

		expect(signaturePad.off).toHaveBeenCalledTimes(1);
		expect(signaturePad.on).not.toHaveBeenCalled();

		await wrapper.setProps({ disabled: false });

		expect(signaturePad.on).toHaveBeenCalledTimes(1);
	});
});
