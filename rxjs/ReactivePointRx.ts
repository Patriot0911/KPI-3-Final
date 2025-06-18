import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

class ReactivePointRx {
  private _x$ = new BehaviorSubject<number>(0);
  private _y$ = new BehaviorSubject<number>(0);

  constructor(x: number, y: number) {
    this._x$.next(x);
    this._y$.next(y);
  };

  move(dx: number, dy: number) {
    this._x$.next(this._x$.value + dx);
    this._y$.next(this._y$.value + dy);
  };

  clone(): ReactivePointRx {
    return new ReactivePointRx(this._x$.value, this._y$.value);
  };

  get x$(): Observable<number> {
    return this._x$.asObservable();
  };

  get y$(): Observable<number> {
    return this._y$.asObservable();
  };

  toString$(): Observable<string> {
    return combineLatest([this._x$, this._y$]).pipe(
      map(([x, y]) => `(${x}, ${y})`)
    );
  };

  getValue = () => ({ x: this._x$.value, y: this._y$.value, });
};

export default ReactivePointRx;
