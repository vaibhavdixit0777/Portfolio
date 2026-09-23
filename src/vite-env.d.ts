/// <reference types="vite/client" />

declare module "gsap/SplitText" {
	export class SplitText {
		chars: HTMLElement[];
		words: HTMLElement[];
		constructor(target: unknown, vars?: Record<string, unknown>);
		revert(): void;
	}
}
