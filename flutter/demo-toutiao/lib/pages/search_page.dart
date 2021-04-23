import 'package:flutter/material.dart';
import 'package:fluttertoutiao/api/search.dart';
import 'package:url_launcher/url_launcher.dart';
import '../mobx/input_state.dart';

class SearchPage extends StatefulWidget {
  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  List<String> hotWords = [];
  List<String> tipWords = [];
  final TextEditingController _controller = new TextEditingController();

  void initState() {
    super.initState();
    getHotSearchKeywords();
  }

  void getTipWords(String word) async {
    if (word.trim() == '') {
      setState(() {
        tipWords = [];
      });
      return;
    }

    var tips = await getSearchTip(word);
    print(tips);
    setState(() {
      tipWords = tips;
    });
  }

  void getHotSearchKeywords() async {
    var keywords = await getHotSearch();
    print(keywords);
    setState(() {
      hotWords = keywords;
    });
  }

  void searchKeyword(String word) async {
    if (word.trim() == '') {
      return;
    }

    final url =
        'http://www.yidianzixun.com/channel/w/${Uri.encodeComponent(word)}';
    if (await canLaunch(url)) {
      launch(url);
    }
  }

  List<Widget> getHotList() {
    return hotWords.map((t) {
      return GestureDetector(
        onTap: () {
          _controller.clear();
          searchKeyword(t);
        },
        child: DecoratedBox(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.black),
              borderRadius: BorderRadius.circular(2.0),
            ),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(t),
            )),
      );
    }).toList();
  }

  List<Widget> getTipList() {
    return tipWords.map((t) {
      return GestureDetector(
        onTap: () {
          _controller.clear();
          searchKeyword(t);
        },
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(t),
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: <Widget>[
            Row(
              children: <Widget>[
                Expanded(
                    child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(icon: Icon(Icons.search)),
                    textInputAction: TextInputAction.search,
                    onChanged: (String word) {
                      getTipWords(word);
                      inputState.change(word);
                    },
                    onSubmitted: (String word) {
                      _controller.clear();
                      searchKeyword(word);
                    },
                  ),
                ))
              ],
            ),
            tipWords.length == 0
                ? Container(
                    child: Column(
                      children: <Widget>[
                        Text("大家都在搜"),
                        Wrap(
                          spacing: 12.0,
                          runSpacing: 12.0,
                          children: getHotList(),
                        )
                      ],
                    ),
                  )
                : Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: getTipList(),
                    ),
                  ),
          ],
        ),
      ),
    );
  }
}
