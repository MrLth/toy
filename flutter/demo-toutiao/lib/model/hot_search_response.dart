import 'package:json_annotation/json_annotation.dart';

part 'hot_search_response.g.dart';

@JsonSerializable()
class HotSearch {
  String status;
  int code;
  List<HotSearchKeyword> keywords;

  HotSearch();

  factory HotSearch.fromJson(Map<String, dynamic> json) =>
      _$HotSearchFromJson(json);

  Map<String, dynamic> toJson() => _$HotSearchToJson(this);
}

@JsonSerializable()
class HotSearchKeyword {
  @JsonKey(defaultValue: '')
  String name;

  @JsonKey(defaultValue: 0)
  int heatRete;

  HotSearchKeyword();

  factory HotSearchKeyword.fromJson(Map<String, dynamic> json) =>
      _$HotSearchKeywordFromJson(json);

  Map<String, dynamic> toJson() => _$HotSearchKeywordToJson(this);
}
