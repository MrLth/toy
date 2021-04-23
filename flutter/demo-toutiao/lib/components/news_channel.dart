import 'package:flutter/material.dart';

class ChannelInfo {
  String id;
  String name;
  ChannelInfo({this.id, this.name});
}

List<ChannelInfo> CHANNEL_INFOS = [
  ChannelInfo(id: "news_hot", name: "热点"),
  ChannelInfo(id: "news_society", name: "社会"),
  ChannelInfo(id: "news_entertainment", name: "娱乐"),
  ChannelInfo(id: "news_tech", name: "科技"),
  ChannelInfo(id: "news_car", name: "汽车"),
  ChannelInfo(id: "news_sports", name: "体育"),
  ChannelInfo(id: "news_finance", name: "财经"),
  ChannelInfo(id: "news_military", name: "军事"),
  ChannelInfo(id: "news_world", name: "国际"),
  ChannelInfo(id: "essay_joke", name: "段子"),
  ChannelInfo(id: "question_and_answer", name: "问答"),
  ChannelInfo(id: "image_funny", name: "趣图"),
  ChannelInfo(id: "组图", name: "图片"),
];

class NewsChannel extends StatelessWidget {
  ChannelInfo channelInfo;
  void Function(ChannelInfo) onSelectChannel;

  NewsChannel({this.channelInfo, this.onSelectChannel});

  List<Widget> getChannelInfosNode() {
    return CHANNEL_INFOS.map((item) {
      final onPress = () {
        if (onSelectChannel != null) {
          onSelectChannel(item);
        }
      };
      return Container(
        child: FlatButton(
          onPressed: onPress,
          child: Text(
            item.name,
            style: TextStyle(
                color: channelInfo != null && channelInfo.id == item.id
                    ? Colors.red
                    : Colors.grey,
                fontWeight: FontWeight.bold),
          ),
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40.0,
//      color: Colors.amberAccent,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: getChannelInfosNode(),
      ),
    );
  }
}
