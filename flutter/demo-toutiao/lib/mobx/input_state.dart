import 'package:mobx/mobx.dart';

part 'input_state.g.dart';

class InputState = InputStateBase with _$InputState;

abstract class InputStateBase with Store {
  @observable
  String value = '';

  @action
  void change(String v) {
    value = v;
  }
}

InputState inputState = InputState();