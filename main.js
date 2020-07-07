//Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//
// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;

  scrollIntoView(link);
});

//Handle scrolling when tapping on the contact me button
const contactMe = document.querySelector(".home__contactme");
contactMe.addEventListener("click", (event) => {
  scrollIntoView("#testimonials");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// index.html
//*******************************************************************************/
const coefficientOfRoughnessPVC = 0.014;
let waterQuantatyPerNozzel;
let pipeDiameterOfTerminalPipe;
let ReviseDiameterOfTerminalPipe;

function terminalPipeDiameter() {
  // //조도 계수 pvc, pe ppvp
  // coefficientOfRoughnessPVC = 0.014;

  // //노즐 당 물량
  waterQuantatyPerNozzel = prompt("말단 지관의 노즐 규격은?");

  // //말단 파이프 관경
  pipeDiameterOfTerminalPipe = Math.sqrt(
    (waterQuantatyPerNozzel * 4 * coefficientOfRoughnessPVC) / (3.14 * 2)
  );

  ReviseDiameterOfTerminalPipe = pipeDiameterOfTerminalPipe * 10;
  alert(
    `추천 되어지는 말단 관경의 크기는 ${ReviseDiameterOfTerminalPipe} m 입니다.`
  );
}

// page1
//*******************************************************************************/

let numberOfTerminalPipe;
let waterQuantatyPerTerminalPipe;
let waterQuantatyDevidePipe;
let pipeDiameterOfDevidePipe;
let ReviseDiameterOfDividePipe;
let ReviseWaterQuantatyOfTerminalPipe;

function dividePipeDiameter() {
  //말단 관경으로 물량구하기
  pipeDiameterOfTerminalPipe = prompt(
    "사용하실 말단 관경을 입력해 주세요. (단위 : m)"
  );

  // //말단 파이프 수
  numberOfTerminalPipe = prompt("하우스당 말단 지관의 수를 입력해주세요");

  pipeDiameterOfTerminalPipe = pipeDiameterOfTerminalPipe / 10;
  ReviseWaterQuantatyOfTerminalPipe =
    (Math.pow(pipeDiameterOfTerminalPipe, 2) * 3.14 * 2) /
    (coefficientOfRoughnessPVC * 4);

  // //말단 파이프 총 물량
  waterQuantatyPerTerminalPipe = ReviseWaterQuantatyOfTerminalPipe;

  // //분기 파이프 총 물량
  waterQuantatyDevidePipe =
    waterQuantatyPerTerminalPipe * (numberOfTerminalPipe / 2);
  // 지관을 2개를 1개로 잡는 것에 대한 오류 때문에 2로 나누었습니다.

  // //분기파이프 관경(주관)
  pipeDiameterOfDevidePipe = Math.sqrt(
    (waterQuantatyDevidePipe * coefficientOfRoughnessPVC * 4) / (3.14 * 2)
  );

  ReviseDiameterOfDividePipe = pipeDiameterOfDevidePipe * 10;

  // let ReviseDiameterOfTerminalPipe = pipeDiameterOfTerminalPipe * 10;
  alert(
    `추천 되어지는 분기 관경의 크기는 ${ReviseDiameterOfDividePipe} m 입니다.`
  );
}

// page2
//*******************************************************************************/
let AmountofFriction;

function Friction() {
  ReviseDiameterOfTerminalPipe = prompt(
    "사용하실 말단 관경을 입력해 주세요. (단위 : m)"
  );

  ReviseDiameterOfDividePipe = prompt(
    "사용하실 분기 관경을 입력해 주세요. (단위 : m)"
  );

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
  let terminalPipeLength = prompt(
    "말단 지관의 파이프 관 한 개의 길이를 입력해주세요."
  );

  //말단파이프 마찰손실수두 주손실
  let majorFrictionOfTermainalPipe =
    (frictionCoefficient *
      (terminalPipeLength * velocityOfWaterForTerminalPipe)) /
    (pipeDiameterOfTerminalPipe * 9.81 * 2);
  console.log(`말단파이프 마찰손실수두 주손실 ${majorFrictionOfTermainalPipe}`);

  //분기파이프의 총 길이
  let devidePipeLength = prompt("분기 파이프의 총 길이를 입력해주세요.");

  //분기파이프 마찰손실수두 주손실
  let majorFrictionOfDiviededPipe =
    (frictionCoefficient * (devidePipeLength * velocityOfWaterForDevidePipe)) /
    (pipeDiameterOfDevidePipe * 9.81 * 2);
  console.log(`분기파이프 마찰 손실수두 주손실 ${majorFrictionOfDiviededPipe}`);

  //하우스 수
  // let numberOfFacility = prompt("하우스는 몇 동인지 입력해주세요.");

  // //

  //분기파이프 마찰손실수두 부손실(곡관) 0.986은 만곡각이 90도이고 곡률반경이 0인 굴절관의 만곡부 손실계수이다.
  let minorFrictionOfDividedPipeByCurved =
    ((0.986 * Math.pow(velocityOfWaterForDevidePipe, 2)) / (2 * 9.81)) *
    numberOfTerminalPipe;
  console.log(
    `분기파이프 마찰 손실수두 부손실(곡관) ${minorFrictionOfDividedPipeByCurved}`
  );

  //말단파이프 마찰손실수두 부손실(곡관)
  let minorFrictionOfTermainalPipeByCurved =
    ((0.986 * Math.pow(velocityOfWaterForTerminalPipe, 2)) / (2 * 9.81)) *
    numberOfTerminalPipe;
  console.log(
    `말단파이프 마찰손실수두 주손실(곡관) ${minorFrictionOfTermainalPipeByCurved}`
  );

  //말단 노즐 갯수
  let terminalNozzelNumber = prompt("말단 지관의 노즐 개수를 입력해주세요.");

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

  AmountofFriction =
    majorFrictionOfDiviededPipe +
    majorFrictionOfTermainalPipe +
    minorFrictionOfDividedPipeByCurved +
    minorFrictionOfTermainalPipeByCurved +
    minorFrictionOfDiviedPipeByReduction;

  alert(
    `분기파이프 마찰 손실수두 주손실 ${majorFrictionOfDiviededPipe} 분기파이프 마찰 손실수두 부손실(곡관) ${minorFrictionOfDividedPipeByCurved} 말단파이프 마찰손실수두 주손실(곡관) ${minorFrictionOfTermainalPipeByCurved} 분기파이프 마찰 손실수두 부손실(급축소) ${minorFrictionOfDiviedPipeByReduction} 총 마찰 손실 수두는 ${AmountofFriction} m 입니다.`
  );
}

// Page3 *******************************************************************/
// 마력값 산정
let suctionLift;
let extra;
let pumpPower;

function pump() {
  suctionLift = prompt("양정을 입력해 주세요. (물탱크와, 관의 높이 차) ");
  extra = AmountofFriction - 1;
  pumpPower =
    0.22 *
    ((waterQuantatyPerNozzel * 360 + 1) / 60) *
    (suctionLift + AmountofFriction) *
    (120 / 60) *
    10;

  alert(`추천 되어지는 펌프의 마력 값은 ${pumpPower} HP 입니다.`);
}

//총 마찰손실수두

// 6월 1 일 랩미팅//
// 화면정의서 만들기
// input
// 화면정의 모듈화

// 논문에 흐름도 작성하기
// 인풋 결과값
