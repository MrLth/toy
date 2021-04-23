import 'package:flutter/material.dart';
import 'package:fluttertoutiao/pages/find_page.dart';
import 'pages/news_page.dart';
import 'pages/find_page.dart';
import 'pages/search_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '今日头条',
      theme: ThemeData(primarySwatch: Colors.red),
      home: Pages(),
      routes: {
        '/search': (BuildContext context) {
          return SearchPage();
        }
      },
    );
  }
}

class Pages extends StatefulWidget {
  @override
  _PagesState createState() => _PagesState();
}

class _PagesState extends State<Pages> {
  int _currentIndex = 0;

  final _pages = [
    NewsPage(),
    FindPage(),
  ];

  void onTapTab(int i) {
    setState(() {
      _currentIndex = i;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("今日头条")),
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: onTapTab,
        items: [
          BottomNavigationBarItem(
              icon: Icon(Icons.fiber_new), title: Text("新闻")),
          BottomNavigationBarItem(icon: Icon(Icons.camera), title: Text("发现")),
        ],
      ),
    );
  }
}
