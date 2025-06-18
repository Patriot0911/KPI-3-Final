import { computed, } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

/*
 * Цей варіант мав би працювати у контексті ангуляру, тож просто залишаю його тут
**/

export interface PointState {
  x: number;
  y: number;
};

const createPointStore = (initialX: number, initialY: number) => signalStore(
  withState<PointState>({
    x: initialX,
    y: initialY,
  }),
  withComputed(({ x, y, }) => ({
    x, y,
    difference: computed(
      () => Math.abs(x() - y())
    ),
  })),
  withMethods((store) => ({
    move(dx: number, dy: number) {
      patchState(store, (state) => ({
        x: state.x + dx,
        y: state.y + dy,
      }));
    },

    clone() {
      const current = store;
      return createPointStore(current.x(), current.y());
    },

    toString() {
      const { x, y } = store;
      return `(${x()}, ${y()})`;
    },

    toStringSignal: computed(() => {
      const { x, y } = store;
      return `(${x}, ${y})`;
    }),
  })),
);

export default createPointStore;
