const cssEditorClasses = {
  BODY: 'css-editor__body',
  CONTAINER: 'css-editor',
  COLOR_CODE: ['css-editor__color-code'],
  EDITOR_INPUT: ['css-editor__text-solution'],
  FORM: 'css-editor__form',
  RULES: 'css-editor__rules',
  RIGHT_ANSWER: 'right-answer',
  SOLUTION_BTN: ['css-editor__confirm-solution','btn'],
  SHOW_TASK: 'show-task',
  TITLE: 'css-editor__title',
  TASK_ICON: 'utils__task-icon',
  TASK_TEXT: 'utils__task-text',
  UTILS_CONTAINER: ['css-editor__utils', 'utils'],
  WIN_ELEMENT: 'win-element',
  WRONG_ANSWER: 'wrong-answer',
};

const CONFIRM_FORM_NAME = 'confirmSolution';
const CONFIRM_BTN_TEXT = 'Enter';
const EDITOR_TITLE = 'CSS Editor';
const HELP_DEFAULT_TEXT = 'Use Start Game button to begin';
const RULES_TEXT = `You can enter CSS selectors in the input field based on the task. It works the same way as in CSS stylesheets. To select an element by ID, use the pound sign (#), and to select by class, use a period (.) etc.
You don't need to put curly braces ({}); it's enough to write just the selector name. For example, to select an element with class "test" and attribute "data-text" set to "test", you can use the selector ".test[data-text='test']".`;
const WIN_MESSAGE = 'You win this game! Do you want to reset the game?';

export { cssEditorClasses, CONFIRM_BTN_TEXT, EDITOR_TITLE, HELP_DEFAULT_TEXT, RULES_TEXT, WIN_MESSAGE, CONFIRM_FORM_NAME };





