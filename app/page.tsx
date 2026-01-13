'use client';

import { useState, useEffect } from 'react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
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
    id: 'basic',
    title: '基本情報の設定',
    icon: '📋',
    items: [
      { id: 'basic-1', title: '施設名を登録', description: '正式な施設名を日本語と英語で登録', checked: false },
      { id: 'basic-2', title: '住所を登録', description: '正確な住所情報を入力', checked: false },
      { id: 'basic-3', title: '連絡先情報を登録', description: '電話番号、メールアドレスを設定', checked: false },
      { id: 'basic-4', title: '施設タイプを選択', description: 'ホテル、旅館、民泊などから選択', checked: false },
    ],
  },
  {
    id: 'rooms',
    title: '客室情報の設定',
    icon: '🛏️',
    items: [
      { id: 'rooms-1', title: '客室タイプを作成', description: 'シングル、ダブル、ツインなどを設定', checked: false },
      { id: 'rooms-2', title: '料金を設定', description: '基本料金と料金カレンダーを設定', checked: false },
      { id: 'rooms-3', title: '客室設備を登録', description: 'エアコン、Wi-Fi、アメニティなどを選択', checked: false },
      { id: 'rooms-4', title: '在庫数を設定', description: '各客室タイプの販売可能数を入力', checked: false },
    ],
  },
  {
    id: 'photos',
    title: '写真のアップロード',
    icon: '📷',
    items: [
      { id: 'photos-1', title: 'メイン写真を登録', description: '施設の外観や代表的な写真', checked: false },
      { id: 'photos-2', title: '客室写真を登録', description: '各客室タイプの写真を最低3枚', checked: false },
      { id: 'photos-3', title: '設備写真を登録', description: 'ロビー、レストラン、温泉など', checked: false },
      { id: 'photos-4', title: '周辺環境の写真', description: '観光スポットやアクセス情報', checked: false },
    ],
  },
  {
    id: 'policies',
    title: 'ポリシー設定',
    icon: '📜',
    items: [
      { id: 'policies-1', title: 'キャンセルポリシー', description: 'キャンセル料金と期限を設定', checked: false },
      { id: 'policies-2', title: 'チェックイン/アウト時間', description: '到着・出発時間を設定', checked: false },
      { id: 'policies-3', title: '支払い方法', description: 'クレジットカード、現地払いなど', checked: false },
      { id: 'policies-4', title: '子供・ペットポリシー', description: '子供料金やペット可否を設定', checked: false },
    ],
  },
  {
    id: 'publish',
    title: '公開設定',
    icon: '🚀',
    items: [
      { id: 'publish-1', title: '施設説明文を作成', description: '魅力的な施設紹介文を日英で作成', checked: false },
      { id: 'publish-2', title: '最終確認', description: 'すべての情報を確認', checked: false },
      { id: 'publish-3', title: '公開申請', description: 'Booking.comへ掲載申請', checked: false },
    ],
  },
];

const STORAGE_KEY = 'booking-dashboard-progress';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [mounted, setMounted] = useState(false);

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

  const getTotalProgress = () => {
    const allItems = categories.flatMap(c => c.items);
    const checkedItems = allItems.filter(i => i.checked);
    return Math.round((checkedItems.length / allItems.length) * 100);
  };

  const getCategoryProgress = (category: Category) => {
    const checkedItems = category.items.filter(i => i.checked);
    return Math.round((checkedItems.length / category.items.length) * 100);
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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl font-bold">全体の進捗状況</h2>
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

        {/* Categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => (
            <div
              key={category.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/15 transition-colors"
            >
              <div className="p-5 border-b border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-white font-bold">{category.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-blue-950/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getCategoryProgress(category) === 100
                          ? 'bg-green-400'
                          : 'bg-blue-400'
                        }`}
                      style={{ width: `${getCategoryProgress(category)}%` }}
                    />
                  </div>
                  <span className="text-blue-300 text-sm font-medium">
                    {getCategoryProgress(category)}%
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {category.items.map(item => (
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
                    <div className="flex-1">
                      <p className={`font-medium transition-colors ${item.checked ? 'text-green-300 line-through' : 'text-white'}`}>
                        {item.title}
                      </p>
                      <p className="text-blue-300 text-sm mt-0.5">{item.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
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
      <footer className="mt-16 py-6 border-t border-blue-700/30 text-center text-blue-300 text-sm">
        <p>Booking.com 掲載手順ダッシュボード © 2026</p>
      </footer>
    </div>
  );
}
