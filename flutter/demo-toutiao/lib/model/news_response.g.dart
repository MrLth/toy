// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'news_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

NewsResponse _$NewsResponseFromJson(Map<String, dynamic> json) {
  return NewsResponse(
    message: json['message'] as String,
    data: (json['data'] as List)
        ?.map((e) =>
            e == null ? null : NewsDataItem.fromJson(e as Map<String, dynamic>))
        ?.toList(),
  );
}

Map<String, dynamic> _$NewsResponseToJson(NewsResponse instance) =>
    <String, dynamic>{
      'message': instance.message,
      'data': instance.data,
    };

NewsDataItem _$NewsDataItemFromJson(Map<String, dynamic> json) {
  return NewsDataItem()..content = json['content'] as String;
}

Map<String, dynamic> _$NewsDataItemToJson(NewsDataItem instance) =>
    <String, dynamic>{
      'content': instance.content,
    };

NewsDataContent _$NewsDataContentFromJson(Map<String, dynamic> json) {
  return NewsDataContent()
    ..abstract = json['abstract'] as String ?? ''
    ..url = json['url'] as String ?? ''
    ..title = json['title'] as String ?? ''
    ..stick_label = json['stick_label'] as String ?? ''
    ..source = json['source'] as String ?? ''
    ..comment_count = json['comment_count'] as int ?? 0
    ..image_list = (json['image_list'] as List)
            ?.map((e) => e == null
                ? null
                : NewsDataImage.fromJson(e as Map<String, dynamic>))
            ?.toList() ??
        [];
}

Map<String, dynamic> _$NewsDataContentToJson(NewsDataContent instance) =>
    <String, dynamic>{
      'abstract': instance.abstract,
      'url': instance.url,
      'title': instance.title,
      'stick_label': instance.stick_label,
      'source': instance.source,
      'comment_count': instance.comment_count,
      'image_list': instance.image_list,
    };

NewsDataImage _$NewsDataImageFromJson(Map<String, dynamic> json) {
  return NewsDataImage(
    url: json['url'] as String,
  );
}

Map<String, dynamic> _$NewsDataImageToJson(NewsDataImage instance) =>
    <String, dynamic>{
      'url': instance.url,
    };
