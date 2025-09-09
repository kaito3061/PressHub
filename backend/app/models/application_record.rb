class ApplicationRecord < ActiveRecord::Base
  # Rails の全てのモデルの共通の親クラス
  # 例: User, PressRelease などはこのクラスを継承する
  # ここに共通の処理を書けば、すべてのモデルで使える
  primary_abstract_class  # 抽象クラスとして扱う（直接は使わない）
end
