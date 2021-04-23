import 'package:flutter/material.dart';
import 'package:fluttertoutiao/api/news.dart';
import 'package:fluttertoutiao/components/news_channel.dart';
import 'package:fluttertoutiao/model/news_response.dart';
import '../components/seach_bar.dart';
import '../components/news_list.dart';

class NewsPage extends StatefulWidget {
  @override
  _NewsPageState createState() => _NewsPageState();
}

class _NewsPageState extends State<NewsPage> {
  ChannelInfo _channelInfo = CHANNEL_INFOS.first;
  List<NewsDataContent> _news = [];
  bool _loading = false;
  bool _loadingMore = false;

  void initState() {
    super.initState();
    _getCurrentNews();
  }

  _getCurrentNews() async {
    if (_loading) {
      return;
    }
    setState(() {
      _loading = true;
    });

    try {
      final news = await fetchNews(_channelInfo.id);
      print(news[0].toJson());
      setState(() {
        _news = news;
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _loading = false;
      });
    }
  }

  _loadMore() async {
    if (_loadingMore) {
      return;
    }
    setState(() {
      _loadingMore = true;
    });
    try {
      final news = await fetchNews(_channelInfo.id,
          start: _news.length, end: _news.length + 10);
      setState(() {
        _news.addAll(news);
        _loadingMore = false;
      });
    } catch (e) {
      setState(() {
        _loadingMore = false;
      });
    }
  }

  _onSelectChannel(ChannelInfo c) async {
    setState(() {
      _channelInfo = c;
    });
    print("_select $c");
    _getCurrentNews();
//    print(res);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          SearchBar(),
          NewsChannel(
            channelInfo: _channelInfo,
            onSelectChannel: _onSelectChannel,
          ),
          !_loading
              ? NewsList(
                  data: _news,
                  onRefresh: _getCurrentNews,
                  loadMore: _loadMore,
                )
              : CircularProgressIndicator(),
        ],
      ),
    );
  }
}
