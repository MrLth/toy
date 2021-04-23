import 'package:dio/dio.dart';
import 'package:fluttertoutiao/model/search_tips_response.dart';
import '../model/hot_search_response.dart';

Dio dio = Dio();

Future<List<String>> getHotSearch() async {
  Response res = await dio.get(
      'http://www.yidianzixun.com/home/q/hot_search_keywords?appid=web_yidian');

  var data = HotSearch.fromJson(res.data);

  return data.keywords.map((item) => item.name).toList();
}

Future<List<String>> getSearchTip(String word) async {
  Response res = await dio.get(
      'http://www.yidianzixun.com/home/q/search_channel?appid=web_yidian&word=${Uri.encodeComponent(word)}');

  var data = SearchTipsResponse.fromJson(res.data);

  return data.channels.map((item) {
    return item.name;
  }).toList();
}
