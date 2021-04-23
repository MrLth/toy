// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_tips_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SearchTipsResponse _$SearchTipsResponseFromJson(Map<String, dynamic> json) {
  return SearchTipsResponse()
    ..code = json['code'] as int ?? 0
    ..channels = (json['channels'] as List)
        ?.map((e) => e == null
            ? null
            : SearchChannel.fromJson(e as Map<String, dynamic>))
        ?.toList();
}

Map<String, dynamic> _$SearchTipsResponseToJson(SearchTipsResponse instance) =>
    <String, dynamic>{
      'code': instance.code,
      'channels': instance.channels,
    };

SearchChannel _$SearchChannelFromJson(Map<String, dynamic> json) {
  return SearchChannel()..name = json['name'] as String;
}

Map<String, dynamic> _$SearchChannelToJson(SearchChannel instance) =>
    <String, dynamic>{
      'name': instance.name,
    };
