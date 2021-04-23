import 'package:flutter/material.dart';

class SearchBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    void gotoSearchPage() {
      Navigator.pushNamed(context, '/search');
    }

    return Container(
      child: Row(
        children: <Widget>[
          Expanded(
              child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(icon: Icon(Icons.search)),
              onTap: gotoSearchPage,
              readOnly: true,
            ),
          ))
        ],
      ),
    );
  }
}
