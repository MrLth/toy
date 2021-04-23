import 'package:flutter/material.dart';
import '../mobx/input_state.dart';

class FindPage extends StatefulWidget {
  @override
  _FindPageState createState() => _FindPageState();
}

class _FindPageState extends State<FindPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(inputState.value),
    );
  }
}
