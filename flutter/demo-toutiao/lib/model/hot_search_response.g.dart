// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hot_search_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HotSearch _$HotSearchFromJson(Map<String, dynamic> json) {
  return HotSearch()
    ..status = json['status'] as String
    ..code = json['code'] as int
    ..keywords = (json['keywords'] as List)
        ?.map((e) => e == null
            ? null
            : HotSearchKeyword.fromJson(e as Map<String, dynamic>))
        ?.toList();
}

Map<String, dynamic> _$HotSearchToJson(HotSearch instance) => <String, dynamic>{
      'status': instance.status,
      'code': instance.code,
      'keywords': instance.keywords,
    };

HotSearchKeyword _$HotSearchKeywordFromJson(Map<String, dynamic> json) {
  return HotSearchKeyword()
    ..name = json['name'] as String ?? ''
    ..heatRete = json['heatRete'] as int ?? 0;
}

Map<String, dynamic> _$HotSearchKeywordToJson(HotSearchKeyword instance) =>
    <String, dynamic>{
      'name': instance.name,
      'heatRete': instance.heatRete,
    };
