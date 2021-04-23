import 'package:json_annotation/json_annotation.dart';

part 'news_response.g.dart';

@JsonSerializable()
class NewsResponse {
  String message;
  List<NewsDataItem> data;

  NewsResponse({this.message, List<NewsDataItem> data})
      : this.data = data ?? <NewsDataItem>[];

  factory NewsResponse.fromJson(Map<String, dynamic> json) =>
      _$NewsResponseFromJson(json);
//
  Map<String, dynamic> toJson() => _$NewsResponseToJson(this);
}

@JsonSerializable()
class NewsDataItem {
  String content;

  NewsDataItem();

  factory NewsDataItem.fromJson(Map<String, dynamic> json) {
    return _$NewsDataItemFromJson(json);
  }

  Map<String, dynamic> toJson() => _$NewsDataItemToJson(this);
}

@JsonSerializable()
class NewsDataContent {
  @JsonKey(defaultValue: '')
  String abstract;

  @JsonKey(defaultValue: '')
  String url;

  @JsonKey(defaultValue: '')
  String title;

  @JsonKey(defaultValue: '')
  String stick_label;

  @JsonKey(defaultValue: '')
  String source;

  @JsonKey(defaultValue: 0)
  int comment_count;

  @JsonKey(defaultValue: [])
  List<NewsDataImage> image_list;

  NewsDataContent();

  factory NewsDataContent.fromJson(Map<String, dynamic> json) =>
      _$NewsDataContentFromJson(json);

  Map<String, dynamic> toJson() => _$NewsDataContentToJson(this);
}

@JsonSerializable()
class NewsDataImage {
  String url;

  NewsDataImage({this.url});

  factory NewsDataImage.fromJson(Map<String, dynamic> json) =>
      _$NewsDataImageFromJson(json);

  Map<String, dynamic> toJson() => _$NewsDataImageToJson(this);
}
