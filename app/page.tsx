'use client';

import { useState, useEffect } from 'react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  priority: '必須' | '高' | '中' | '低';
  checked: boolean;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
}

const initialCategories: Category[] = [
  {
    id: 'pre-sale',
    title: '販売前の設定',
    icon: '🚀',
    items: [
      { id: 'pre-1', title: '営業許可証情報（届出番号など）の入力', description: '全項目を正しく入力する必要がある。', priority: '必須', checked: false },
      { id: 'pre-2', title: '在庫の同期・連動', description: 'オーバーブッキングを防止する。', priority: '必須', checked: false },
      { id: 'pre-3', title: '料金設定（先の繁忙期の料金確認）', description: '安すぎる料金での予約を防ぐ。', priority: '高', checked: false },
      { id: 'pre-4', title: 'メッセージのセキュリティ登録', description: 'リンクやURLを事前に登録しないと送信できない場合がある。', priority: '高', checked: false },
      { id: 'pre-5', title: '新規施設向けプロモーション利用', description: '掲載初期の予約獲得を促進する。', priority: '中', checked: false },
      { id: 'pre-6', title: 'キャンセルポリシーの設定見直し', description: 'デフォルトで「前日まで無料」となっている場合があるので確認が必要。', priority: '中', checked: false },
      { id: 'pre-7', title: '連絡先の更新', description: '顧客対応を外注している場合、すぐに連絡が取れる担当者の情報を入れる。', priority: '中', checked: false },
      { id: 'pre-8', title: '予約のリクエスト制（承認制）', description: '掲載に慣れないうちはおすすめ。', priority: '低', checked: false },
      { id: 'pre-9', title: 'テスト予約実施', description: '販売開始後、必ず実際の予約画面から確認する。', priority: '高', checked: false },
    ],
  },
  {
    id: 'basic',
    title: '基礎設定',
    icon: '⚙️',
    items: [
      { id: 'basic-1', title: '施設ページスコア100%達成', description: '露出を高めるための基本設定。', priority: '高', checked: false },
      { id: 'basic-2', title: '子供ポリシー（料金）の設定', description: 'デフォルトで子供料金が未設定の場合があるため、ファミリー層の予約を取り込む。', priority: '高', checked: false },
      { id: 'basic-3', title: '写真24枚以上登録＆タグ付け', description: '予約のコンバージョン率向上に繋がる。', priority: '高', checked: false },
      { id: 'basic-4', title: '12ヶ月先までの在庫オープン', description: '早期予約を獲得する。', priority: '中', checked: false },
      { id: 'basic-5', title: '清掃料金の設定', description: '設定漏れが多い項目。', priority: '中', checked: false },
      { id: 'basic-6', title: '宿泊人数別の料金設定', description: 'グループや家族など多様なユーザーの獲得。', priority: '中', checked: false },
      { id: 'basic-7', title: '自動返信/定型文のセット', description: '返信速度の維持とオペレーションの負担軽減。', priority: '中', checked: false },
      { id: 'basic-8', title: '銀行情報の入力', description: '売上をスムーズに受け取るための準備。', priority: '中', checked: false },
      { id: 'basic-9', title: '管理アプリのダウンロード', description: '日常的な管理を容易にする。', priority: '中', checked: false },
      { id: 'basic-10', title: '設備・アメニティの全入力', description: '検索フィルター対策。', priority: '低', checked: false },
    ],
  },
  {
    id: 'advanced',
    title: 'アドバンス設定',
    icon: '🎯',
    items: [
      { id: 'adv-1', title: '多様なプラン（料金タイプ）の設定', description: '返金不可やウィークリープランなどで、キャンセル率の低減と稼働率の安定を図る。', priority: '高', checked: false },
      { id: 'adv-2', title: 'Geniusプログラムへの参画', description: 'Geniusは集客に非常に有効（参加条件あり）。', priority: '高', checked: false },
      { id: 'adv-3', title: 'Preferredプログラムへの参画', description: '競合が多いエリアでは必須（参加条件あり）。', priority: '高', checked: false },
      { id: 'adv-4', title: 'モバイル・国別割引の設定', description: 'スマートフォンユーザーや特定マーケットのユーザー獲得。', priority: '高', checked: false },
      { id: 'adv-5', title: 'Googleマップのピン位置と露出の確認', description: '予約の入り口を広げる。', priority: '高', checked: false },
      { id: 'adv-6', title: '料金の整合性の維持（最安値保証の遵守）', description: '他のOTAと同じ料金設定で、露出とコンバージョン率を向上させる。', priority: '中', checked: false },
      { id: 'adv-7', title: '柔軟なキャンセルポリシーの提供', description: '予約のコンバージョン率が大幅に向上する。', priority: '中', checked: false },
      { id: 'adv-8', title: 'スポンサー広告の利用', description: '効果は高いが、プロ向けの有料プログラム。', priority: '低', checked: false },
      { id: 'adv-9', title: '競合施設セットの登録', description: '適正価格を把握する。', priority: '低', checked: false },
      { id: 'adv-10', title: '税金（宿泊税など）の設定', description: '宿泊税など、必要な税金を設定する。', priority: '低', checked: false },
      { id: 'adv-11', title: '30日以上の予約の受け入れ設定', description: '長期滞在のユーザーを獲得する。', priority: '低', checked: false },
      { id: 'adv-12', title: 'お支払いを受け取るタイミングの調整', description: '週ごとなど、支払い頻度を設定できる。', priority: '低', checked: false },
      { id: 'adv-13', title: 'ダイナミックプライシングの導入', description: 'Geniusのダイナミックプライシング機能やPricelabsなどを利用すると、利益最大化にする。', priority: '低', checked: false },
    ],
  },
];

const STORAGE_KEY = 'booking-dashboard-progress-v2';

const priorityColors = {
  '必須': 'bg-red-500/20 text-red-300 border-red-500/30',
  '高': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  '中': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  '低': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'all' | '必須' | '高' | '中' | '低'>('all');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCategories(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved progress', e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories, mounted]);

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
            ...cat,
            items: cat.items.map(item =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            ),
          }
          : cat
      )
    );
  };

  const getFilteredItems = (items: ChecklistItem[]) => {
    if (filter === 'all') return items;
    return items.filter(item => item.priority === filter);
  };

  const getTotalProgress = () => {
    const allItems = categories.flatMap(c => c.items);
    const checkedItems = allItems.filter(i => i.checked);
    return Math.round((checkedItems.length / allItems.length) * 100);
  };

  const getCategoryProgress = (category: Category) => {
    const checkedItems = category.items.filter(i => i.checked);
    return Math.round((checkedItems.length / category.items.length) * 100);
  };

  const getRequiredProgress = () => {
    const requiredItems = categories.flatMap(c => c.items).filter(i => i.priority === '必須');
    const checkedRequired = requiredItems.filter(i => i.checked);
    return requiredItems.length > 0 ? Math.round((checkedRequired.length / requiredItems.length) * 100) : 100;
  };

  const resetProgress = () => {
    if (confirm('進捗をリセットしますか？')) {
      setCategories(initialCategories);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    );
  }

  const progress = getTotalProgress();
  const requiredProgress = getRequiredProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Header */}
      <header className="bg-blue-950/50 backdrop-blur-sm border-b border-blue-700/30 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              B
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Booking.com 掲載手順</h1>
              <p className="text-blue-300 text-sm">ダッシュボード</p>
            </div>
          </div>
          <button
            onClick={resetProgress}
            className="px-4 py-2 text-sm text-blue-300 hover:text-white hover:bg-blue-700/50 rounded-lg transition-colors"
          >
            リセット
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-bold">全体の進捗</h2>
              <span className="text-3xl font-bold text-blue-300">{progress}%</span>
            </div>
            <div className="h-4 bg-blue-950/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-blue-200 text-sm mt-3">
              {categories.flatMap(c => c.items).filter(i => i.checked).length} / {categories.flatMap(c => c.items).length} 項目完了
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-bold">必須項目の進捗</h2>
              <span className={`text-3xl font-bold ${requiredProgress === 100 ? 'text-green-400' : 'text-red-400'}`}>{requiredProgress}%</span>
            </div>
            <div className="h-4 bg-blue-950/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${requiredProgress === 100 ? 'bg-green-400' : 'bg-red-400'}`}
                style={{ width: `${requiredProgress}%` }}
              />
            </div>
            <p className="text-blue-200 text-sm mt-3">
              {categories.flatMap(c => c.items).filter(i => i.priority === '必須' && i.checked).length} / {categories.flatMap(c => c.items).filter(i => i.priority === '必須').length} 必須項目完了
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', '必須', '高', '中', '低'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
            >
              {f === 'all' ? 'すべて' : f}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map(category => {
            const filteredItems = getFilteredItems(category.items);
            if (filteredItems.length === 0) return null;

            return (
              <div
                key={category.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className="p-5 border-b border-white/10 bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-white font-bold text-lg">{category.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-blue-950/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${getCategoryProgress(category) === 100
                            ? 'bg-green-400'
                            : 'bg-blue-400'
                            }`}
                          style={{ width: `${getCategoryProgress(category)}%` }}
                        />
                      </div>
                      <span className="text-blue-300 text-sm font-medium min-w-[3rem]">
                        {getCategoryProgress(category)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {filteredItems.map(item => (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(category.id, item.id)}
                        className="mt-1 w-5 h-5 rounded border-2 border-blue-400 bg-transparent checked:bg-blue-500 checked:border-blue-500 cursor-pointer accent-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={`font-medium transition-colors ${item.checked ? 'text-green-300 line-through' : 'text-white'}`}>
                            {item.title}
                          </p>
                          <span className={`px-2 py-0.5 text-xs rounded-full border ${priorityColors[item.priority]}`}>
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-blue-300 text-sm mt-1">{item.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">おめでとうございます！</h2>
            <p className="text-green-200">すべての掲載手順が完了しました。</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-blue-700/30">
        <div className="max-w-2xl mx-auto px-4">
          {/* Credits */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xl">🙏</span>
              <h3 className="text-white font-bold">Special Thanks</h3>
            </div>
            <p className="text-blue-200 text-center mb-4">
              このチェックリストは
              <a
                href="https://x.com/henry_z0807"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium mx-1 underline underline-offset-2"
              >
                ヘンリーさん (@henry_z0807)
              </a>
              が作成・公開してくださった内容を元に作成しました。
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://x.com/henry_z0807"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/50 rounded-full text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                プロフィール
              </a>
              <a
                href="https://x.com/henry_z0807/status/2010637888552304738"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-full text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                元の投稿を見る
              </a>
            </div>
          </div>

          <p className="text-blue-300 text-sm text-center">
            Booking.com 掲載手順ダッシュボード © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
