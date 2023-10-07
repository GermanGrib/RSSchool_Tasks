import './car.scss';
import ElementCreator from '../element-creator';
import { SCREEN_WIDTH_RATIO, carParams, winParams } from './variables-car';
import { ICar, IEngine } from '../../../models/interfaces';
import { trackCss } from '../track/variables-track';
import singletonCarService from '../../services/carsService/carsService';

export default class Car extends ElementCreator {
  public color?: string;

  static animationInProgress = false;

  static winnerID: number;

  static transitionEndHandlerMap: { [carID: number]: () => void } = {};

  constructor(color?: string) {
    super(carParams);

    this.color = color;
  }

  setTextContent(text = ''): void {
    if (this.element) {
      this.element.innerHTML = text;
    }
  }

  static updateCarInGarage(options: ICar): void {
    const { color, name, id } = options;

    if (color && name && id) {
      const currentCar = document.querySelector(
        `.${carParams.classNames}[data-id="${id}"] .car-svg`
      ) as SVGElement;
      const currentName = document.querySelector(
        `.${trackCss.TOP_CAR_NAME}[data-id="${id}"]`
      ) as HTMLHeadingElement;

      if (currentCar && currentName) {
        currentCar.style.color = color;
        currentName.textContent = name;
        singletonCarService.updateCar(id, options);
      }
    }
  }

  setCarColor(): HTMLElement | undefined {
    if (this.element) {
      const currentElement = this.element;
      const CURRENT_SVG = currentElement.firstElementChild;
      if (CURRENT_SVG instanceof SVGElement) {
        CURRENT_SVG.style.color = `${this.color}`;
      }

      return this.element;
    }
    return undefined;
  }

  static startDriveAnimation(engineData: IEngine, carID: number): object {
    const element = document.querySelector(
      `.car[data-id="${carID}"] .car-svg`
    ) as HTMLElement;
    const { velocity, distance } = engineData;

    const timeInSeconds = (distance / velocity / 1000).toFixed(2);
    const screenWidth = window.innerWidth * SCREEN_WIDTH_RATIO;
    const endPosition = screenWidth - element.clientWidth;

    element.style.transform = `translateX(${endPosition}px)`;
    element.style.transition = `transform ${timeInSeconds}s linear`;

    return { timeInSeconds, carID };
  }

  static showWinner(carID: number): void {
    if (!Car.animationInProgress) {
      const MAIN = document.querySelector('.main') as HTMLElement;
      const winTextParams = ElementCreator.getElementParams(
        'div',
        [`${winParams.textClass}`],
        ''
      );
      const WIN_TEXT_ELEMENT = new ElementCreator(
        winTextParams
      ).getElement() as HTMLElement;

      MAIN.appendChild(WIN_TEXT_ELEMENT);
      singletonCarService.getCarById(carID).then((response) => {
        MAIN.classList.add(`${winParams.class}`);
        WIN_TEXT_ELEMENT.textContent = `${winParams.text} ${response.name}`;

        document.addEventListener('click', () => WIN_TEXT_ELEMENT.remove(), {
          once: true,
        });
      });
      Car.winnerID = carID;
      Car.animationInProgress = true;
    }
  }

  static carIsDead(carId: number): void {
    const element = document.querySelector(`.car[data-id="${carId}"] .car-svg`);
    if (!element) {
      return;
    }
    const currentPosition = element.getBoundingClientRect().x;
    if (element instanceof SVGElement) {
      element.style.transition = 'none';
      element.style.transform = `translateX(${currentPosition}px)`;
    }
  }

  static returnCarOnBase(carID: number): void {
    const element = document.querySelector(
      `.car[data-id="${carID}"] .car-svg`
    ) as HTMLElement;

    element.style.transform = `translateX(0px)`;
    element.style.transition = `transform 0s linear`;
  }
}
