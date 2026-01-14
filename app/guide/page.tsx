'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function GuidePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputPassword === 'ヘンリー') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('合言葉が違います');
            setInputPassword('');
        }
    };

    // 認証前の画面
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-4">
                            📈
                        </div>
                        <h1 className="text-white font-bold text-xl">収益最大化ガイド</h1>
                        <p className="text-blue-300 text-sm mt-2">このページは限定公開です</p>
                    </div>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                                placeholder="合言葉を入力..."
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                                autoFocus
                            />
                        </div>
                        {error && (
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
                        >
                            入室する
                        </button>
                        <a
                            href="/BookingPostingprocedure/"
                            className="block text-center text-blue-400/60 hover:text-blue-300 text-sm mt-4"
                        >
                            ← トップに戻る
                        </a>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/BookingPostingprocedure/" className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg hover:opacity-80 transition-opacity">
                            B
                        </Link>
                        <div>
                            <h1 className="text-slate-800 font-bold text-lg">収益最大化ガイド</h1>
                            <p className="text-slate-500 text-xs">Booking.com パートナーヘルプ準拠</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 pb-20 space-y-8">
                {/* Intro Section */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">💡</span>
                        はじめに
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        Booking.comで予約を伸ばし、売上を最大化するための重要なポイントをまとめました。
                        これらは公式の「パートナーヘルプ」やデータ分析に基づいた、効果の実証された手法です。
                    </p>
                </div>

                {/* Section 1: Strategies */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl">📈</span>
                        予約を伸ばすための戦略
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* 販促アドバイス */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 hover:border-blue-200 transition-colors">
                            <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                                <span className="text-amber-500">★</span> 機会プロモーション（販促アドバイス）
                            </h3>
                            <p className="text-slate-600 text-sm mb-4">
                                管理画面の「販促アドバイス」は、近隣施設と比較して「どこで客を逃しているか」を分析してくれる強力なツールです。
                            </p>
                            <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 font-medium">
                                ✅ 管理画面の提案を定期的にチェックし、適用しましょう
                            </div>
                        </div>

                        {/* モバイル割引 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 hover:border-blue-200 transition-colors">
                            <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                                <span className="text-blue-500">📱</span> モバイル端末割引
                            </h3>
                            <p className="text-slate-600 text-sm mb-4">
                                予約の大半はスマートフォンから行われます。10%以上の割引を設定することで、スマホ検索での順位が上がり、露出が大幅に増えます。
                            </p>
                            <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 font-medium">
                                ✅ モバイル割引（10%〜）を設定して検索順位UP
                            </div>
                        </div>

                        {/* 国・地域別料金 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 hover:border-blue-200 transition-colors">
                            <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                                <span className="text-emerald-500">🌏</span> 国・地域別料金
                            </h3>
                            <p className="text-slate-600 text-sm mb-4">
                                インバウンド（訪日外国人）需要を取り込むために、特定の国・地域からの予約に対して特別料金を設定することが有効です。
                            </p>
                            <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 font-medium">
                                ✅ ターゲット国からの予約を増やすために活用
                            </div>
                        </div>

                        {/* ファミリー・長期 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 hover:border-blue-200 transition-colors">
                            <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                                <span className="text-purple-500">👨‍👩‍👧</span> ファミリー・長期滞在
                            </h3>
                            <p className="text-slate-600 text-sm mb-4">
                                子供料金を正しく設定するとファミリー層の検索にヒットします。また、週単位・月単位の割引は稼働率の安定に繋がります。
                            </p>
                            <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 font-medium">
                                ✅ 子供料金設定と連泊割引（7泊〜）を導入
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Recommended Settings */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xl">⚙️</span>
                        オーナー向け推奨設定
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
                            <h3 className="font-bold text-lg text-slate-800 mb-2">📸 写真のクオリティとタグ付け</h3>
                            <p className="text-slate-600 text-sm mb-3">
                                施設ページで最も重要なのは写真です。5〜10枚以上の明るく清潔感のある写真を掲載してください。
                                また、各写真に「バスルーム」「寝室」などのタグを正しく設定しないと、検索フィルターに引っかからない場合があります。
                            </p>
                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 ml-2">
                                <li>キッチン、バスルーム、眺望の写真は必須</li>
                                <li>すべての写真にタグ付けを行う</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
                            <h3 className="font-bold text-lg text-slate-800 mb-2">📅 カレンダー在庫管理</h3>
                            <p className="text-slate-600 text-sm">
                                予約機会を逃さないため、在庫は常に最新の状態に保ってください。特に繁忙期や週末の在庫切れには注意が必要です。
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
                            <h3 className="font-bold text-lg text-slate-800 mb-2">🔄 キャンセルポリシーの最適化</h3>
                            <p className="text-slate-600 text-sm">
                                「返金不可プラン」でリスクを抑えつつ、「直前までキャンセル無料」の柔軟なプランも用意することで、
                                安心感を求めるゲストと安さを求めるゲストの両方を取り込めます。
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
                            <h3 className="font-bold text-lg text-slate-800 mb-2">🛋️ 設備・アメニティの全登録</h3>
                            <p className="text-slate-600 text-sm">
                                無料Wi-Fi、駐車場、ペット可、ベビーベッドなど、提供できる設備はすべてチェックを入れてください。
                                ゲストはフィルター機能を使うため、登録漏れがあると検索結果に表示されません。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer Link */}
                <div className="text-center pt-8">
                    <Link href="/BookingPostingprocedure/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-medium">
                        <span>←</span>
                        トップページに戻る
                    </Link>
                </div>
            </main>
        </div>
    );
}
