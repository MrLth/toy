import 'package:flutter/material.dart';
import 'package:fluttertoutiao/model/news_response.dart';
import 'package:url_launcher/url_launcher.dart';

class NewsList extends StatelessWidget {
  List<NewsDataContent> data;
  Function onRefresh;
  Function loadMore;

  ScrollController _scrollController = new ScrollController();

  NewsList({this.data, this.onRefresh, this.loadMore}) {
    _scrollController
      ..addListener(() {
        var triggerFetchMoreSize =
            0.9 * _scrollController.position.maxScrollExtent;

        if (_scrollController.position.pixels > triggerFetchMoreSize) {
          // call fetch more method here
          print('more');
          loadMore();
        }
      });
  }

  openDetail(NewsDataContent item) async {
    final url = item.url;
    print(url);
    if (await canLaunch(url)) {
      await launch(url);
    }
  }

  List<Widget> getListItem() {
    if (data == null) {
      return [];
    }

    return data.map((item) {
      if (item == null) {
        return Container();
      }

      return GestureDetector(
        onTap: () => openDetail(item),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                item.title,
                style: TextStyle(fontSize: 24),
              ),
              Text(item.abstract),
              item.image_list == null
                  ? Container()
                  : Container(
                      child: Row(
                        children: item.image_list.map((img) {
                          return Expanded(
                              child: Padding(
                            padding: const EdgeInsets.all(4.0),
                            child: Image.network(img.url),
                          ));
                        }).toList(),
                      ),
                    ),
              Row(
                children: <Widget>[
                  Text(
                    item.stick_label,
                    style: TextStyle(color: Colors.black54),
                  ),
                  Text(
                    item.source,
                    style: TextStyle(color: Colors.black54),
                  ),
                  SizedBox(
                    width: 6.0,
                  ),
                  Text(
                    '${item.comment_count ?? 0} 评论',
                    style: TextStyle(color: Colors.black54),
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: RefreshIndicator(
        onRefresh: () async {
          await onRefresh();
        },
        child: ListView(
          controller: _scrollController,
          shrinkWrap: true,
          children: getListItem(),
        ),
      ),
    );
  }
}
