import PointSignal from "./PointSignal";

console.log('PointSignal Block');
const pointSignal = new PointSignal(0, 0);

console.log(pointSignal.x());
console.log(pointSignal.y());
console.log(pointSignal.toString());
// 0
// 0
// (0, 0)
const pointStrSignal = pointSignal.toStringSignal();
console.log(pointStrSignal());
// (0, 0)
pointSignal.move(2, 2);
console.log(pointStrSignal());
// (2, 2)

const pointSignalClone =  pointSignal.clone();
pointSignalClone.move(14, 4);
console.log(pointStrSignal());
console.log(pointSignalClone.toStringSignal()());
// (2, 2)
// (16, 6)

const diff = pointSignal.difference();
console.log(diff());
pointSignal.move(22, 0);
console.log(diff());
// 0
// 22

/*
 * Ефекти наведені нижче - мали б працювати лише в ангуляр контексті
**/

// const effectRef = effect(() => {
//   console.log({
//     x: pointSignal.x(),
//     y: pointSignal.y(),
//     delta: pointSignal.difference()(),
//   });
// });

// pointSignal.move(11, 2);
// pointSignal.move(4, 1);

// pointSignalClone.move(2, 4);

// effectRef.destroy();
// pointSignal.move(4, 1);
