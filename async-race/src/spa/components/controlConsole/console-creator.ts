/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import './console.scss';
import { CurrentStateValues } from '../../../models/interfaces';
import stateSingleTone from '../../state/state';
import ElementCreator from '../element-creator';
import {
  DISABLED_CLASS,
  StateNames,
  consoleBtnTexts,
  consoleContainerCss,
  consoleParams,
  controlButtonsCss,
  createCarFormCss,
  defaultColorInputValue,
  defaultFormCss,
  updateCarFormCss,
} from './variables-console';
import singletonEventHandler from '../../controller/controller';

export default class ConsolePanel extends ElementCreator {
  constructor() {
    super(consoleParams);
  }

  configureView(): HTMLElement | null {
    const containerParams = ElementCreator.getElementParams('div', consoleContainerCss, '');
    const MAIN_CONTAINER = new ElementCreator(
      containerParams
    ).getElement() as HTMLDivElement;
    const NEW_CAR_FORM = this.getNewCarForm();
    const UPDATE_CAR_FORM = this.getUpdateCarForm();
    const CONTROL_BTNS = this.getControlButtons();

    MAIN_CONTAINER.append(NEW_CAR_FORM, UPDATE_CAR_FORM, CONTROL_BTNS);
    this.element?.appendChild(MAIN_CONTAINER);

    return this.element;
  }

  getNewCarForm(): HTMLFormElement {
    const createInputFromStateValue =
      this.loadValueFromState().currentCreateInput;
    const currentColorInputInState =
      this.loadValueFromState().currentColorCreateInput;
    const NEW_CAR_FORM = this.createForm();
    const NAME_INPUT = this.createNewNameInput();
    const COLOR_INPUT = this.createColorInput();
    const submitBtnParams = ElementCreator.getElementParams(
      'button',
      createCarFormCss.BTN,
      consoleBtnTexts.createBtn
    );
    const SUBMIT_BTN = new ElementCreator(
      submitBtnParams
    ).getElement() as HTMLButtonElement;

    NEW_CAR_FORM.classList.add(...createCarFormCss.FORM);
    NAME_INPUT.classList.add(...createCarFormCss.INPUT);
    COLOR_INPUT.classList.add(...createCarFormCss.COLOR);
    SUBMIT_BTN.type = 'submit';

    if (createInputFromStateValue) {
      NAME_INPUT.value = createInputFromStateValue;
    }

    if (currentColorInputInState) {
      COLOR_INPUT.value = currentColorInputInState;
    }

    NAME_INPUT.addEventListener('input', this.saveValueInState);
    COLOR_INPUT.addEventListener('input', this.saveValueInState);
    NEW_CAR_FORM.addEventListener('submit', (event) =>
      singletonEventHandler.createBtnInGarage(event, NAME_INPUT, COLOR_INPUT)
    );

    NEW_CAR_FORM.append(NAME_INPUT, COLOR_INPUT, SUBMIT_BTN);

    return NEW_CAR_FORM;
  }

  getUpdateCarForm(): HTMLFormElement {
    const updateInputFromStateValue = this.loadValueFromState().currentUpdateInput;
    const currentUpdateColorInState = this.loadValueFromState().currentColorUpdateInput;
    const UPDATE_CAR_FORM = this.createForm();
    const NAME_INPUT = this.createNewNameInput();
    const COLOR_INPUT = this.createColorInput();
    const submitBtnParams = ElementCreator.getElementParams( 'button', updateCarFormCss.BTN, consoleBtnTexts.updateBtn);
    const SUBMIT_BTN = new ElementCreator( submitBtnParams ).getElement() as HTMLButtonElement;

    UPDATE_CAR_FORM.classList.add(...updateCarFormCss.FORM);
    NAME_INPUT.classList.add(...updateCarFormCss.INPUT);
    COLOR_INPUT.classList.add(...updateCarFormCss.COLOR);
    SUBMIT_BTN.type = 'submit';

    if (updateInputFromStateValue) {
      NAME_INPUT.value = updateInputFromStateValue;
    }

    if (currentUpdateColorInState) {
      COLOR_INPUT.value = currentUpdateColorInState;
    }

    COLOR_INPUT.addEventListener('input', this.saveValueInState);
    NAME_INPUT.addEventListener('input', (event) =>
      this.saveValueInState(event)
    );
    UPDATE_CAR_FORM.addEventListener('submit', (event) =>
      singletonEventHandler.updateBtnInGarage(event, NAME_INPUT, COLOR_INPUT)
    );

    UPDATE_CAR_FORM.append(NAME_INPUT, COLOR_INPUT, SUBMIT_BTN);

    return UPDATE_CAR_FORM;
  }

  createForm(): HTMLFormElement {
    const formParams = ElementCreator.getElementParams('form', defaultFormCss.FORM, '');
    const FORM = new ElementCreator(formParams).getElement() as HTMLFormElement;

    return FORM;
  }

  createNewNameInput(): HTMLInputElement {
    const nameInputParams = ElementCreator.getElementParams(
      'input',
      defaultFormCss.SET_NAME,
      ''
    );
    const NAME_INPUT = new ElementCreator(
      nameInputParams
    ).getElement() as HTMLInputElement;
    NAME_INPUT.required = true;

    return NAME_INPUT;
  }

  createColorInput(): HTMLInputElement {
    const colorInputParams = ElementCreator.getElementParams(
      'input',
      defaultFormCss.COLOR,
      ''
    );
    const COLOR_INPUT = new ElementCreator(
      colorInputParams
    ).getElement() as HTMLInputElement;
    COLOR_INPUT.type = 'color';

    return COLOR_INPUT;
  }

  getControlButtons(): HTMLDivElement {
    const containerParams = ElementCreator.getElementParams( 'div', controlButtonsCss.CONTAINER, '' );
    const raceBtnParams = ElementCreator.getElementParams( 'button', controlButtonsCss.RACE, consoleBtnTexts.race );
    const resetBtnParams = ElementCreator.getElementParams( 'button', controlButtonsCss.RESET, consoleBtnTexts.reset
    );
    const generateCarsBtnParams = ElementCreator.getElementParams( 'button', controlButtonsCss.GENERATE_CARS, consoleBtnTexts.generateCars);

    const CONTROL_CONTAINER = new ElementCreator( containerParams ).getElement() as HTMLDivElement;
    const RACE_BTN = new ElementCreator( raceBtnParams ).getElement() as HTMLButtonElement;
    const RESET_BTN = new ElementCreator( resetBtnParams ).getElement() as HTMLButtonElement;
    const GENERATE_CARS_BTN = new ElementCreator( generateCarsBtnParams ).getElement() as HTMLButtonElement;

    RACE_BTN.addEventListener( 'click', singletonEventHandler.raceAllCarsOnCurrentPage );
    RESET_BTN.addEventListener( 'click', singletonEventHandler.returnAllCarsToBase );
    GENERATE_CARS_BTN.addEventListener( 'click', singletonEventHandler.generateCarsBtn );
    CONTROL_CONTAINER.append(RACE_BTN, RESET_BTN, GENERATE_CARS_BTN);

    return CONTROL_CONTAINER;
  }

  saveValueInState(event: Event): void {
    const input = event?.target as HTMLInputElement;
    const { value } = input;

    if (input && input.classList.contains(`${createCarFormCss.INPUT}`)) {
      stateSingleTone.setField(StateNames.NAME_IN_CREATE_INPUT, value);
      stateSingleTone.saveState();
    } else if (input && input.classList.contains(`${updateCarFormCss.INPUT}`)) {
      stateSingleTone.setField(StateNames.NAME_IN_UPDATE_INPUT, value);
      stateSingleTone.saveState();
    } else if (input && input.classList.contains(`${createCarFormCss.COLOR}`)) {
      stateSingleTone.setField(StateNames.COLOR_IN_CREATE_INPUT, value);
      stateSingleTone.saveState();
    } else if (input && input.classList.contains(`${updateCarFormCss.COLOR}`)) {
      stateSingleTone.setField(StateNames.COLOR_IN_UPDATE_INPUT, value);
      stateSingleTone.saveState();
    }
  }

  loadValueFromState(): CurrentStateValues {
    const currentCreateInput = stateSingleTone.getField(
      StateNames.NAME_IN_CREATE_INPUT
    );
    const currentColorCreateInput = stateSingleTone.getField(
      StateNames.COLOR_IN_CREATE_INPUT
    );
    const currentUpdateInput = stateSingleTone.getField(
      StateNames.NAME_IN_UPDATE_INPUT
    );
    const currentColorUpdateInput = stateSingleTone.getField(
      StateNames.COLOR_IN_UPDATE_INPUT
    );

    return {
      currentCreateInput,
      currentColorCreateInput,
      currentUpdateInput,
      currentColorUpdateInput,
    };
  }

  static setDefaultFormValues( nameInput: HTMLInputElement, colorInput: HTMLInputElement ): void {
    nameInput.value = '';
    colorInput.value = defaultColorInputValue;

    if ( nameInput && nameInput.classList.contains(`${createCarFormCss.INPUT}`) ) {
      stateSingleTone.setField(
        StateNames.NAME_IN_CREATE_INPUT,
        nameInput.value
      );
      stateSingleTone.saveState();
    } else if ( nameInput && nameInput.classList.contains(`${updateCarFormCss.INPUT}`) ) {
      stateSingleTone.setField(
        StateNames.NAME_IN_UPDATE_INPUT,
        nameInput.value
      );
      stateSingleTone.saveState();
    }

    if (
      colorInput &&
      colorInput.classList.contains(`${createCarFormCss.COLOR}`)
    ) {
      stateSingleTone.setField(
        StateNames.COLOR_IN_CREATE_INPUT,
        colorInput.value
      );
      stateSingleTone.saveState();
    } else if (
      colorInput &&
      colorInput.classList.contains(`${updateCarFormCss.COLOR}`)
    ) {
      stateSingleTone.setField(
        StateNames.COLOR_IN_UPDATE_INPUT,
        colorInput.value
      );
      stateSingleTone.saveState();
    }
  }

  static toggleDisableStateUpdateForm(state: boolean): void {
    const UPDATE_FORM = document.querySelector(
      `.${defaultFormCss.FORM}.${updateCarFormCss.FORM}`
    );

    UPDATE_FORM?.classList.toggle(`${DISABLED_CLASS}`, !state);
  }

  static toggleRaceAndResetBtns(event: Event): void {
    const { target } = event;
    const RACE_BTN = document.querySelector(`.${controlButtonsCss.RACE}`);
    const RESET_BTN = document.querySelector(`.${controlButtonsCss.RESET}`);

    if (target === RACE_BTN) {
      RACE_BTN?.classList.add(`${DISABLED_CLASS}`);
      RESET_BTN?.classList.remove(`${DISABLED_CLASS}`);
    } else if ( target === RESET_BTN && !RESET_BTN?.classList.contains(`${DISABLED_CLASS}`)) {
      setTimeout(() => {
        RACE_BTN?.classList.remove(`${DISABLED_CLASS}`);
      }, 2500);
      RESET_BTN?.classList.add(`${DISABLED_CLASS}`);
    }
  }
}
