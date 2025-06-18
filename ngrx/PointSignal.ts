import { computed, Signal, signal } from "@angular/core";

class PointSignal {
  private _x = signal(0);
  private _y = signal(0);

  constructor(x: number, y: number) {
    this._x.set(x);
    this._y.set(y);
  };

  get x() {
    return this._x;
  };
  get y() {
    return this._y;
  };

  move(dx: number, dy: number) {
    this._x.update((state) => state + dx);
    this._y.update((state) => state + dy);
  };

  toString(): string {
    return `(${this._x()}, ${this._y()})`;
  };
  toStringSignal(): Signal<string> {
    return computed(
      () => `(${this._x()}, ${this._y()})`
    );
  };

  clone() {
    return new PointSignal(this._x(), this._y());
  };

  difference(): Signal<number> {
    return computed(
      () => Math.abs(this._x() - this._y())
    );
  };
};

export default PointSignal;
