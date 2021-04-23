import 'package:json_annotation/json_annotation.dart';

part 'search_tips_response.g.dart';

@JsonSerializable()
class SearchTipsResponse {
  @JsonKey(defaultValue: 0)
  int code;

  List<SearchChannel> channels;

  SearchTipsResponse();

  factory SearchTipsResponse.fromJson(Map<String, dynamic> json) =>
      _$SearchTipsResponseFromJson(json);

  Map<String, dynamic> toJson() => _$SearchTipsResponseToJson(this);
}

@JsonSerializable()
class SearchChannel {
  String name;

  SearchChannel();

  factory SearchChannel.fromJson(Map<String, dynamic> json) =>
      _$SearchChannelFromJson(json);

  Map<String, dynamic> toJson() => _$SearchChannelToJson(this);
}
