import { Subject, takeUntil } from 'rxjs';
import ReactivePointRx from './ReactivePointRx';

const rxPoint = new ReactivePointRx(0, 0);

console.clear();

const destroyX$ = new Subject<void>();
const destroyY$ = new Subject<void>();
const destroyG$ = new Subject<void>();

rxPoint.x$.pipe(takeUntil(destroyX$)).subscribe(
  (state) => console.log(`Changed X to: ${state}`)
);
rxPoint.y$.pipe(takeUntil(destroyY$)).subscribe(
  (state) => console.log(`Changed Y to: ${state}`)
);

// Changed X to: 0
// Changed Y to: 0
console.log(rxPoint.getValue());
// { x: 0, y: 0 }
rxPoint.move(2, -2);
// Changed X to: 2
// Changed Y to: -2
console.log(rxPoint.getValue());
// { x: 2, y: -2 }

destroyX$.next();
destroyX$.complete();

rxPoint.move(2, -2);
// Changed Y to: -4
console.log(rxPoint.getValue());
// { x: 4, y: -4 }

destroyY$.next();
destroyY$.complete();

const rxState = rxPoint.toString$();
rxState.pipe(takeUntil(destroyG$)).subscribe(
  (state) => console.log({state})
);
// (4, -4)
rxPoint.move(2, -2);
// (6, -4)
// (6, -6)

destroyG$.next();
destroyG$.complete();
rxPoint.move(-6, 6);

const cloneRxPoint = rxPoint.clone();
rxPoint.move(9, 12);
console.log(rxPoint.getValue());
console.log(cloneRxPoint.getValue());
// { x: 9, y: 12 }
// { x: 0, y: 0 }
cloneRxPoint.move(12, 9);
console.log(rxPoint.getValue());
console.log(cloneRxPoint.getValue());
// { x: 9, y: 12 }
// { x: 12, y: 9 }
