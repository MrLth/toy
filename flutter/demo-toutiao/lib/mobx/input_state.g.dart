// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'input_state.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$InputState on InputStateBase, Store {
  final _$valueAtom = Atom(name: 'InputStateBase.value');

  @override
  String get value {
    _$valueAtom.reportRead();
    return super.value;
  }

  @override
  set value(String value) {
    _$valueAtom.reportWrite(value, super.value, () {
      super.value = value;
    });
  }

  final _$InputStateBaseActionController =
      ActionController(name: 'InputStateBase');

  @override
  void change(String v) {
    final _$actionInfo = _$InputStateBaseActionController.startAction(
        name: 'InputStateBase.change');
    try {
      return super.change(v);
    } finally {
      _$InputStateBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
value: ${value}
    ''';
  }
}
