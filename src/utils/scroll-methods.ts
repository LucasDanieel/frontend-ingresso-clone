import { MouseEvent, RefObject } from "react";
import { paginationProps } from "../components/components-home/wrapper-scroll";

export const move_left = (
  ref: RefObject<HTMLDivElement>,
  setHiddenBefore: (value: boolean) => void,
  setHiddenAfter: (value: boolean) => void
) => {
  ref.current?.scrollBy({ left: -530, behavior: "smooth" });
  setTimeout(() => {
    if (ref.current) {
      if (ref.current.scrollLeft <= 0) setHiddenBefore(true);
    }
  }, 500);

  setHiddenAfter(false);
};

export const move_right = (
  ref: RefObject<HTMLDivElement>,
  setHiddenBefore: (value: boolean) => void,
  setHiddenAfter: (value: boolean) => void
) => {
  ref.current?.scrollBy({ left: 530, behavior: "smooth" });
  setTimeout(() => {
    if (ref.current) {
      const total = ref.current.scrollLeft + ref.current.clientWidth;
      if (total >= ref.current.scrollWidth) setHiddenAfter(true);
    }
  }, 500);

  setHiddenBefore(false);
};

let isDown = false;
let startX = 0;
let scrollLeft = 0;
let velocity = 0;
let lastMouseX = 0;
let lastTime = 0;
let inertiaInterval: number;

const applyInertia = (
  ref: RefObject<HTMLDivElement>,
  setHiddenBefore: (value: boolean) => void,
  setHiddenAfter: (value: boolean) => void
) => {
  if (Math.abs(velocity) > 0.1 && isFinite(velocity)) {
    if (ref.current) {
      (ref.current as HTMLDivElement).scrollLeft -= velocity;
      velocity *= 0.8;
    }
  } else {
    clearInterval(inertiaInterval);

    if (ref.current) {
      const total = ref.current.scrollLeft + ref.current.clientWidth;
      if (total >= ref.current.scrollWidth) {
        setHiddenAfter(true);
      } else {
        setHiddenAfter(false);
      }

      if (ref.current.scrollLeft <= 0) {
        setHiddenBefore(true);
      } else {
        setHiddenBefore(false);
      }
    }
  }
};

export const mouse_move = (e: MouseEvent<HTMLDivElement>, ref: RefObject<HTMLDivElement>) => {
  if (!isDown) return;
  e.preventDefault();

  if (ref.current) {
    const element = ref.current as HTMLElement;
    element.classList.add("active");
    const x = e.pageX;
    const walk = x - startX;
    const newScrollLeft = scrollLeft - walk;
    ref.current.scrollLeft = newScrollLeft;

    if (newScrollLeft < 0) element.style.paddingLeft = `${Math.abs(walk / 5)}px`;

    if (newScrollLeft > ref.current.scrollLeft) element.style.paddingRight = `${Math.abs(walk / 5)}px`;

    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;
    velocity = ((x - lastMouseX) / deltaTime) * 30;

    lastMouseX = x;
    lastTime = currentTime;
  }
};

export const mouse_down = (e: MouseEvent<HTMLDivElement>, ref: RefObject<HTMLDivElement>) => {
  isDown = true;

  if (ref.current) {
    startX = e.pageX;
    scrollLeft = ref.current.scrollLeft;
    lastMouseX = e.pageX;
    lastTime = Date.now();
    clearInterval(inertiaInterval);
  }
};

export const mouse_up = (
  ref: RefObject<HTMLDivElement>,
  setHiddenBefore: (value: boolean) => void,
  setHiddenAfter: (value: boolean) => void,
  pagination?: paginationProps[],
  setPagination?: (value: paginationProps[]) => void
) => {
  isDown = false;
  const element = ref.current as HTMLElement;
  element.style.padding = "0px";

  clearInterval(inertiaInterval);
  inertiaInterval = setInterval(() => applyInertia(ref, setHiddenBefore, setHiddenAfter), 16);

  if (ref.current) {
    element.classList.remove("active");
  }

  if (setPagination && pagination) {
    const newLeftScroll = element.scrollLeft + element.clientWidth / 2;
    var newArray;

    if (newLeftScroll <= element.scrollWidth * 0.4) {
      newArray = pagination.map((value, idx) => {
        if (idx == 0) value.isActive = true;
        else value.isActive = false;
        return value;
      });
    } else if (newLeftScroll <= element.scrollWidth * 0.6) {
      newArray = pagination.map((value, idx) => {
        if (idx == 1) value.isActive = true;
        else value.isActive = false;
        return value;
      });
    } else {
      newArray = pagination.map((value, idx) => {
        if (idx == 2) value.isActive = true;
        else value.isActive = false;
        return value;
      });
    }

    setPagination(newArray);
  }
};
