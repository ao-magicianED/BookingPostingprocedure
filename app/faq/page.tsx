'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    id: string;
    title: string;
    icon: string;
    items: FAQItem[];
}

const faqData: FAQCategory[] = [
    {
        id: 'registration',
        title: '初期設定・登録関連',
        icon: '📋',
        items: [
            {
                question: '新規施設登録時に「非公開/予約不可」のまま公開できません',
                answer: '営業許可証の認証待ち、住所認証待ち、セキュリティ審査中などの理由が考えられます。カスタマーサポートに施設IDを伝えて状況を確認してもらいましょう。新規施設の場合、営業許可証の写真アップロードが必須となっています。',
            },
            {
                question: '住所認証（所在地認証）のコードが届きません',
                answer: '通常2週間ほどかかります。届かない場合は動画をアップロードする方法もあります。iCalでカレンダー連動を先に設定すると認証プロセスが速くなることがあります。',
            },
            {
                question: '同じ住所で複数の施設を登録したら重複判定されました',
                answer: '同じ住所の施設は自動的に重複物件と判定されます。部屋番号を入れても解除されない場合があります。カスタマーサポートに連絡するか、Booking.com担当者に重複解除を依頼してください。',
            },
            {
                question: '施設の所有権移転（オーナーチェンジ）はどうすればいいですか？',
                answer: '同じ住所で新規アカウントを作成することはできません。既存アカウントのオーナーチェンジ手続きが必要です。移転期間中も予約受付は可能です。パートナーヘルプの「宿泊施設の所有権が移転する際に行うこと」を参照してください。',
            },
            {
                question: '営業許可証情報の入力について連絡が何度も来ます',
                answer: '住所、ライセンスの写真を含む全ての情報を記入済みであれば、無視して問題ありません。ただし未入力の場合は掲載停止になる可能性があるので、早めに入力してください。',
            },
        ],
    },
    {
        id: 'pricing',
        title: '料金・プロモーション設定',
        icon: '💰',
        items: [
            {
                question: 'Genius割引とモバイル割引は重複して適用されますか？',
                answer: 'はい、両方が適用される仕組みです。変更はできません。初心者の方はプロモーションをたくさんかけすぎないことをおすすめします。設定画面に説明がありますが、複雑なので注意が必要です。',
            },
            {
                question: 'Geniusプログラムを一度退会したら再参加できますか？',
                answer: '一度退会すると、しばらくの間は再参加できない仕組みになっています。Booking.com側で変更する権限もありません。退会は慎重に検討してください。',
            },
            {
                question: '週間割引/月間割引が意図しない予約に適用されてしまいました',
                answer: 'ダイナミックルール設定が原因の可能性があります。設定を確認し、不要なルールは削除してください。料金プランの最低宿泊日数の設定も確認が必要です。',
            },
            {
                question: '最低宿泊日数を設定しても1泊予約が入ってしまいます',
                answer: 'Standard Rate以外のプラン（Non-refundable Rateなど）が1泊になっていないか確認してください。サイトコントローラー使用時は連携設定の優先順位も確認が必要です。問題が解消しない場合はプランを削除して新規作成するのが確実です。',
            },
            {
                question: '清掃料金の設定方法は？',
                answer: '「宿泊施設」→「宿泊施設のポリシー」から設定できます。「清掃料金を宿泊料金に含める」を「いいえ」に設定すると、別途清掃料金を表示できます。',
            },
            {
                question: '子供料金（子供ポリシー）の設定は必要ですか？',
                answer: 'デフォルトでは子供料金が未設定で、一律大人料金となります。ファミリー層の予約を取り込むために設定をおすすめします。',
            },
            {
                question: '宿泊税の設定はどうすればいいですか？',
                answer: '宿泊税は自分で設定できないため、カスタマーサポートに連絡して代わりに設定してもらう必要があります。',
            },
        ],
    },
    {
        id: 'booking',
        title: '予約・キャンセル対応',
        icon: '📅',
        items: [
            {
                question: '予約リクエスト制の仕組みを教えてください',
                answer: '①ゲストがリクエスト→②宿が承認→③ゲストが24時間以内に最終確認、の3ステップです。③をゲストが行わないと自動キャンセルになります。現在、②の承認時に事前決済を組み合わせる機能を開発中で、将来的には③のステップが不要になる予定です。',
            },
            {
                question: '予約リクエスト中にゲストにメッセージを送れません',
                answer: '予約が完了するまではメッセージのやり取りができない仕様です。現時点ではiOSユーザー同士のみ事前のやり取りが可能です。今後改善される予定です。',
            },
            {
                question: 'ホスト側からキャンセルするにはどうすればいいですか？',
                answer: '2つの方法があります。①管理画面から依頼、②カスタマーサポートへ電話。ゲスト側でキャンセルしてもらう方がスムーズです。チェックイン48時間以内はメールボックスから依頼する必要があります。',
            },
            {
                question: 'ゲストへの返金方法は？',
                answer: 'Airbnbのようにホストだけでは完結できません。カスタマーサポートを通して変更依頼する必要があります。チェックイン48時間を切ると変更できなくなるため、直接ゲストと金銭のやり取りが必要になります。',
            },
            {
                question: 'ノーショーのゲストもレビューを書けますか？',
                answer: 'はい、ヨーロッパの法律により、ノーショーでもレビューを残すことができます。ただし、削除リクエストを出すことは可能です。',
            },
            {
                question: '台風などの不可抗力でキャンセルしたい場合は？',
                answer: '不可抗力（Force Majeure）に当てはまるかどうかはカスタマーサポートが判断します。予約関連の相談はカスタマーに連絡してください。',
            },
            {
                question: 'ホスト都合でキャンセルした場合のペナルティは？',
                answer: 'ゲストの代替施設との差額分をホストが負担する可能性があります。ただし実際にはホテル在庫も多いため、ほぼ発生しないケースが多いです。SEO的なペナルティは特にないと言われています。',
            },
        ],
    },
    {
        id: 'agoda',
        title: 'Agoda連携問題',
        icon: '🌏',
        items: [
            {
                question: 'Agoda経由の予約を見分ける方法は？',
                answer: '①メールアドレスが@agoda-messaging.comになっている、②予約詳細に「提携パートナー」として記載がある、③ゲストの住所が「バンコクのプルデンシャルタワー」になっている、などで判断できます。',
            },
            {
                question: 'Agoda経由のゲストにメッセージが届きません',
                answer: 'Agodaのスタッフが確認してから転送するため時間がかかります。ゲストから直接連絡先（メールアドレスなど）を聞いて、そこからやり取りするのが確実です。',
            },
            {
                question: 'Agodaのゲストにリンクを送るとマスキングされます',
                answer: 'Agoda経由の予約では、送信したリンクがマスキングされてゲストに届かないことがあります。メールアドレスを3つに分けて送ってもらう方法が有効です（例：samplehotel / gmail / com）。',
            },
            {
                question: 'Agodaからの予約を止める方法はありますか？',
                answer: '予約リクエスト制にするとAgodaに表示されなくなり、Agodaからの予約が止まります。',
            },
            {
                question: 'Agoda経由のゲストはBookingの口コミを書けますか？',
                answer: 'いいえ、Agoda経由の予約ではBooking.comの口コミは書けません。',
            },
        ],
    },
    {
        id: 'message',
        title: 'メッセージ・コミュニケーション',
        icon: '💬',
        items: [
            {
                question: 'メッセージにURLを送れません',
                answer: 'セキュリティ設定でURLを事前登録する必要があります。登録したURLとメッセージに貼り付けたURLが完全に一致している必要があります。反映までに少し時間がかかることがあります。',
            },
            {
                question: '自動メッセージが文字化けして送られることがあります',
                answer: '稀に発生するバグです。予約IDをカスタマーサポートに伝えて、担当チームにフィードバックしてもらってください。',
            },
            {
                question: 'ゲストから画像やパスポート写真を受け取れますか？',
                answer: '現時点ではゲストからホストへの画像添付はできない仕様です。メールアドレスを聞いて別途送ってもらうか、チェックインシステム（AirHostなど）の利用をおすすめします。',
            },
            {
                question: '定型文に添付した写真が送られません',
                answer: 'バグの可能性があります。写真だけ別途送信すると送れる場合があります。カスタマーサポートに予約IDを伝えてバグ報告してください。',
            },
            {
                question: '返信スコアとは何ですか？使えないと不利になりますか？',
                answer: 'ゲストからのメッセージにどれほど迅速に対応しているかを表すスコアです。使えなくても特に不利なことは発生しません。',
            },
        ],
    },
    {
        id: 'payment',
        title: '支払い・入金関連',
        icon: '💳',
        items: [
            {
                question: '銀行口座登録でエラーが出ます',
                answer: '銀行コードや口座情報は、通帳と完全に一致させる必要があります。半角/全角、スペースの有無、「カ）」などの省略表記も正確に入力してください。',
            },
            {
                question: '今まで問題なかった口座が急に差し戻しになりました',
                answer: '口座名義の表記（大文字/小文字、半角括弧/全角括弧など）を微調整して再登録すると通ることがあります。partner.payments@booking.comに英語で問い合わせると対応が早いです。',
            },
            {
                question: '支払いを週ごと/月ごとに変えると手数料は変わりますか？',
                answer: '支払い手数料は変わりません。',
            },
            {
                question: '領収書はホストが発行する必要がありますか？',
                answer: 'はい。現地の法律によって必要な請求書（領収書）の種類が異なるため、Booking.comは代わりに発行できません。Booking.comの「領収書」と宿泊施設の宿泊証明書を合わせてゲストに提供するのが一般的です。',
            },
            {
                question: 'ゲストが払った金額と入金額が違うのはなぜ？',
                answer: 'Booking.comが一部の宿泊料金を負担するケース（Genius割引など）があるため、ゲストの支払額が少なくなる場合があります。詳細はカスタマーサポートに確認してください。',
            },
        ],
    },
    {
        id: 'app',
        title: 'アプリ・システム関連',
        icon: '📱',
        items: [
            {
                question: 'Pulseアプリの通知が届きません',
                answer: '管理画面右上の人のマークから「通知設定」を確認してください。「連絡先」→「予約管理」にメールアドレスを追加すると予約関連の通知が届くようになります。アプリの再インストールも試してみてください。',
            },
            {
                question: 'Pulseの認証コードエラーで使えません',
                answer: 'アプリを削除して再インストールし、認証し直すと復活することがあります。SMSでPINコードを受け取る方法もあります。',
            },
            {
                question: 'PCからログインできません',
                answer: 'バグの可能性があります。①Google Chromeを使う、②クッキーを削除する、③PCを再起動する、④携帯から試す、などを試してください。',
            },
            {
                question: 'メッセージの赤丸（🔴）が消えません',
                answer: '未読を表す意味ですが、たまにバグで消えないことがあります。未読以上の意味はないので放置して問題ありません。',
            },
            {
                question: '初期登録が95%でループして進みません',
                answer: '①Google Chromeを使う、②クッキーを削除する、③携帯から試す、④最初から登録し直す、の順で試してください。大抵これで解決できます。',
            },
        ],
    },
    {
        id: 'program',
        title: 'プログラム参加',
        icon: '🏆',
        items: [
            {
                question: 'Preferredプログラムの参加条件は？',
                answer: '所在エリアの売上Top30%であれば参加できます。最近は民泊同士だけで比較するテストも行われています。競合の多いエリアでは必須です。',
            },
            {
                question: 'Preferredに入るメリットは？',
                answer: '検索画面で優先表示されます。また、近隣エリアを検索した際にも、Preferred施設は優先して表示されます（例：箱根検索時に小田原や御殿場の施設も表示される）。',
            },
            {
                question: '露出強化ツールとスポンサー広告の違いは？',
                answer: '露出強化ツールは成果報酬の手数料加算で、効果測定が難しいですが参加しやすいです。スポンサー広告は細かく分析でき、平均ROIは16（1万円で16万円の売上）と言われていますが、最低でも月数万円の予算が必要です。',
            },
            {
                question: '写真は何枚登録すべきですか？',
                answer: '24枚以上登録してタグ付けすることで、予約のコンバージョン率が向上します。なお、人が写った写真は掲載できないのでご注意ください。',
            },
            {
                question: '口コミの数と質、どちらが重要ですか？',
                answer: '社内で関連データは公開されていませんが、露出に最も影響が大きいのは「直近の予約数・売上」なので、口コミ数の方が影響が大きい可能性があります。',
            },
            {
                question: 'AirbnbのレビューをBookingに反映できますか？',
                answer: '登録時にAirbnbのリンクから情報を導入したり、iCalで連動すると反映される確率が上がります。マニュアルでの導入受付はしていないため、反映されなければ諦めるしかありません。',
            },
        ],
    },
];

export default function FAQPage() {
    const [openCategory, setOpenCategory] = useState<string | null>('registration');
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
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

    const toggleCategory = (categoryId: string) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId);
    };

    const toggleItem = (categoryId: string, itemIndex: number) => {
        const key = `${categoryId}-${itemIndex}`;
        setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // 認証前の画面
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-4">
                            📚
                        </div>
                        <h1 className="text-white font-bold text-xl">ナレッジベース</h1>
                        <p className="text-blue-300 text-sm mt-2">このページは限定公開です</p>
                    </div>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                                placeholder="合言葉を入力..."
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                                autoFocus
                            />
                        </div>
                        {error && (
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                        >
                            入室する
                        </button>
                        <a
                            href="/"
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
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
            {/* Header */}
            <header className="bg-blue-950/50 backdrop-blur-sm border-b border-blue-700/30 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg hover:opacity-80 transition-opacity">
                            B
                        </Link>
                        <div>
                            <h1 className="text-white font-bold text-lg">Booking.com ナレッジベース</h1>
                            <p className="text-blue-300 text-sm">よくある質問と回答</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm text-blue-300 hover:text-white hover:bg-blue-700/50 rounded-lg transition-colors"
                    >
                        ← 戻る
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Intro */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                    <p className="text-blue-200 text-sm leading-relaxed">
                        このページは、Booking.comの運営で実際に発生した質問と回答をまとめたナレッジベースです。
                        公式ヘルプに加えて、実践的なノウハウを収録しています。
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {faqData.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => toggleCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${openCategory === category.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-blue-200 hover:bg-white/20'
                                }`}
                        >
                            {category.icon} {category.title}
                        </button>
                    ))}
                </div>

                {/* FAQ Content */}
                <div className="space-y-4">
                    {faqData
                        .filter((category) => openCategory === category.id)
                        .map((category) => (
                            <div key={category.id} className="space-y-3">
                                {category.items.map((item, index) => {
                                    const key = `${category.id}-${index}`;
                                    const isOpen = openItems[key];
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleItem(category.id, index)}
                                                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                                            >
                                                <span className="text-white font-medium">{item.question}</span>
                                                <span
                                                    className={`text-blue-300 transition-transform ${isOpen ? 'rotate-180' : ''
                                                        }`}
                                                >
                                                    ▼
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="px-5 pb-4">
                                                    <p className="text-blue-200 text-sm leading-relaxed whitespace-pre-wrap">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                </div>

                {/* Tips Section */}
                <div className="mt-12">
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        💡 役立つヒント
                    </h2>

                    {/* Useful Contacts */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            📞 便利な連絡先
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-blue-300 shrink-0">カスタマーサポート電話:</span>
                                <span className="text-white font-mono">03-4563-7151</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-blue-300 shrink-0">財務部（入金関連）:</span>
                                <span className="text-white font-mono text-xs">partner.payments@booking.com</span>
                            </div>
                            <p className="text-blue-400/60 text-xs mt-2">※ 財務部への問い合わせは英語推奨</p>
                        </div>
                    </div>

                    {/* 180 Day Rule */}
                    <div className="bg-amber-500/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 mb-6">
                        <h3 className="text-amber-300 font-bold mb-4 flex items-center gap-2">
                            ⚠️ 新法民泊の180日ルール
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-200">
                            <li>• 新法民泊は<span className="text-amber-300 font-bold">180日を超えると自動的に掲載停止</span>になります</li>
                            <li>• 観光庁から各OTAに停止指示が来る仕組みです</li>
                            <li>• 旅館業への切り替え時は忘れずに登録情報を更新してください</li>
                        </ul>
                    </div>

                    {/* Recommended Tools */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            🛠️ おすすめツール・サービス
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="bg-white/5 rounded-xl p-4">
                                <h4 className="text-white font-bold text-sm">AirHost</h4>
                                <p className="text-blue-300 text-xs mt-1">チェックインフォームでパスポート情報収集が楽になる</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <h4 className="text-white font-bold text-sm">Pricelabs</h4>
                                <p className="text-blue-300 text-xs mt-1">ダイナミックプライシングで利益最大化</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <h4 className="text-white font-bold text-sm">Beds24</h4>
                                <p className="text-blue-300 text-xs mt-1">サイトコントローラー（在庫連動）</p>
                            </div>
                        </div>
                    </div>

                    {/* Cautions */}
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 mb-6">
                        <h3 className="text-red-300 font-bold mb-4 flex items-center gap-2">
                            🚨 注意事項
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-200">
                            <li>• <span className="text-red-300 font-bold">フィッシングメール</span>に注意（Bookingを装った詐欺メールが増加中）</li>
                            <li>• Agoda経由予約は<span className="text-white">WhatsAppで直接連絡</span>が確実</li>
                            <li>• メールアドレスを聞く場合は<span className="text-white">3つに分けて</span>送ってもらう（例：sample / gmail / com）</li>
                        </ul>
                    </div>
                </div>

                {/* Note */}
                <div className="mt-12 text-center">
                    <p className="text-blue-400/60 text-xs">
                        ※ この情報は実際のホスト経験に基づいています。最新情報は
                        <a
                            href="https://partner.booking.com/ja/help"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-300 mx-1"
                        >
                            Booking.com パートナーヘルプ
                        </a>
                        をご確認ください。
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-blue-700/30">
                <p className="text-blue-300 text-sm text-center">
                    Booking.com ナレッジベース © 2026
                </p>
            </footer>
        </div>
    );
}
