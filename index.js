//조도 계수 pvc, pe ppvp
const coefficientOfRoughnessPVC = 0.014;

//노즐 당 물량
let waterQuantatyPerNozzel = prompt("말단 지관의 노즐당 물량은 ?");

//말단 파이프 관경
let pipeDiameterOfTerminalPipe = Math.sqrt(
  (waterQuantatyPerNozzel * 4 * coefficientOfRoughnessPVC) / (3.14 * 2)
);

let ReviseDiameterOfTerminalPipe = pipeDiameterOfTerminalPipe * 10;

// page1
//*******************************************************************************/

//말단 파이프 수
let numberOfTerminalPipe = prompt("하우스당 말단 지관의 수는?");

//말단 파이프 총 물량
let waterQuantatyPerTerminalPipe = waterQuantatyPerNozzel;

//분기 파이프 총 물량
let waterQuantatyDevidePipe =
  waterQuantatyPerTerminalPipe * numberOfTerminalPipe;

//분기파이프 관경(주관)
let pipeDiameterOfDevidePipe = Math.sqrt(
  (waterQuantatyDevidePipe * coefficientOfRoughnessPVC * 4) / (3.14 * 2)
);

let ReviseDiameterOfDividePipe = pipeDiameterOfDevidePipe * 10;

// page2
//*******************************************************************************/

//파이프 단면적 (A)
let terminalPipeArea = (Math.pow(ReviseDiameterOfTerminalPipe, 2) * 3.14) / 4;
let dividedPipeArea = (Math.pow(ReviseDiameterOfDividePipe, 2) * 3.14) / 4;

//말단 파이프 유속
let velocityOfWaterForTerminalPipe =
  waterQuantatyPerTerminalPipe / terminalPipeArea;

//분기 파이프 유속
let velocityOfWaterForDevidePipe = waterQuantatyDevidePipe / dividedPipeArea;

// pvc 마찰손실계수 0.0015 (f)
let frictionCoefficient = 0.0015;

//말단 파이프 길이
let terminalPipeLength = prompt("말단 지관의 파이프 관 한개의 길이는 ?");

//말단파이프 마찰손실수두 주손실
let majorFrictionOfTermainalPipe =
  (frictionCoefficient *
    (terminalPipeLength * velocityOfWaterForTerminalPipe)) /
  (pipeDiameterOfTerminalPipe * 9.81 * 2);
console.log(`말단파이프 마찰손실수두 주손실 ${majorFrictionOfTermainalPipe}`);

//분기파이프의 총 길이
let devidePipeLength = prompt("분기 파이프의 총 길이?");

//분기파이프 마찰손실수두 주손실
let majorFrictionOfDiviededPipe =
  (frictionCoefficient * (devidePipeLength * velocityOfWaterForDevidePipe)) /
  (pipeDiameterOfDevidePipe * 9.81 * 2);
console.log(`분기파이프 마찰 손실수두 주손실 ${majorFrictionOfDiviededPipe}`);

//하우스 수
let numberOfFacility = prompt("하우스는 몇 동인지 ?");

//

//분기파이프 마찰손실수두 부손실(곡관) 0.986은 만곡각이 90도이고 곡률반경이 0인 굴절관의 만곡부 손실계수이다.
let minorFrictionOfDividedPipeByCurved =
  ((0.986 * Math.pow(velocityOfWaterForDevidePipe, 2)) / (2 * 9.81)) *
  numberOfFacility;
console.log(
  `분기파이프 마찰 손실수두 부손실(곡관) ${minorFrictionOfDividedPipeByCurved}`
);

//말단파이프 마찰손실수두 부손실(곡관)
let minorFrictionOfTermainalPipeByCurved =
  ((0.986 * Math.pow(velocityOfWaterForTerminalPipe, 2)) / (2 * 9.81)) *
  numberOfFacility *
  numberOfTerminalPipe;
console.log(
  `말단파이프 마찰손실수두 주손실(곡관) ${minorFrictionOfTermainalPipeByCurved}`
);

//말단 노즐 갯수
let terminalNozzelNumber = prompt("말단 지관의 노즐 개수는 ?");

// 분기 -> 말단 단면 수축 계수
let ReductionCoefficient =
  0.62 + 0.38 * Math.pow(dividedPipeArea / terminalPipeArea, 3);

//분기파이프 마찰손실수두 부손실(급축소)
let minorFrictionOfDiviedPipeByReduction =
  ((Math.pow(1 / ReductionCoefficient - 1, 2) *
    Math.pow(velocityOfWaterForTerminalPipe, 2)) /
    (2 * 9.81)) *
  numberOfTerminalPipe;
console.log(
  `분기파이프 마찰 손실수두 부손실(급축소) ${minorFrictionOfDiviedPipeByReduction}`
);

// Page3 *******************************************************************/

//총 마찰손실수두
let AmountofFriction =
  majorFrictionOfDiviededPipe +
  majorFrictionOfTermainalPipe +
  minorFrictionOfDividedPipeByCurved +
  minorFrictionOfTermainalPipeByCurved +
  minorFrictionOfDiviedPipeByReduction;

console.log(ReviseDiameterOfTerminalPipe);
console.log(ReviseDiameterOfDividePipe);
console.log(AmountofFriction);

// 6월 1 일 랩미팅//
// 화면정의서 만들기
// input
// 화면정의 모듈화
