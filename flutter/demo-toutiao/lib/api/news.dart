import 'package:dio/dio.dart';
import 'package:fluttertoutiao/model/news_response.dart';
import 'dart:convert';

Dio dio = Dio();

Future<List<NewsDataContent>> fetchNews(String channel,
    {int start = 0, int end = 10}) async {
  Response res = await dio
      .get('http://is.snssdk.com/api/news/feed/v51/?category=${channel}');

  NewsResponse data = NewsResponse.fromJson((res.data));

  if (data.message != "success") {
    throw (Error());
  }

  return data.data
      .map((item) => NewsDataContent.fromJson(jsonDecode(item.content)))
      .toList();
}
