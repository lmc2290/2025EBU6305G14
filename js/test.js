(function () {
    "use strict";

    const STORAGE_KEY = "ebu6305_test_v4_final";

    function makeScene(type) {
        const svgs = {
            clean: `
                <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="320" height="180" fill="#dbeafe"/>
                    <rect y="112" width="320" height="68" fill="#86efac"/>
                    <circle cx="55" cy="45" r="22" fill="#fde68a"/>
                    <rect x="120" y="70" width="70" height="65" fill="#60a5fa"/>
                    <polygon points="120,70 155,42 190,70" fill="#1d4ed8"/>
                    <rect x="210" y="55" width="38" height="80" fill="#ef4444"/>
                    <path d="M0 115 Q55 90 110 115 T220 115 T320 115" fill="none" stroke="#16a34a" stroke-width="5"/>
                </svg>`,
            blocky: `
                <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="320" height="180" fill="#c7d2fe"/>
                    <rect x="0" y="0" width="80" height="60" fill="#dbeafe"/>
                    <rect x="80" y="0" width="80" height="60" fill="#bfdbfe"/>
                    <rect x="160" y="0" width="80" height="60" fill="#dbeafe"/>
                    <rect x="240" y="0" width="80" height="60" fill="#bfdbfe"/>
                    <rect x="0" y="60" width="80" height="60" fill="#93c5fd"/>
                    <rect x="80" y="60" width="80" height="60" fill="#60a5fa"/>
                    <rect x="160" y="60" width="80" height="60" fill="#93c5fd"/>
                    <rect x="240" y="60" width="80" height="60" fill="#60a5fa"/>
                    <rect x="0" y="120" width="80" height="60" fill="#4ade80"/>
                    <rect x="80" y="120" width="80" height="60" fill="#22c55e"/>
                    <rect x="160" y="120" width="80" height="60" fill="#4ade80"/>
                    <rect x="240" y="120" width="80" height="60" fill="#22c55e"/>
                    <rect x="120" y="60" width="80" height="60" fill="#3b82f6" opacity="0.75"/>
                    <rect x="200" y="50" width="40" height="80" fill="#ef4444" opacity="0.75"/>
                </svg>`,
            stripes: `
                <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="320" height="180" fill="#f8fafc"/>
                    ${Array.from({ length: 16 }, (_, i) => `<rect x="${i * 20}" width="20" height="180" fill="${i % 2 ? '#f9fafb' : '#111827'}"/>`).join("")}
                </svg>`,
            noisy: `
                <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" x2="1">
                            <stop offset="0%" stop-color="#60a5fa"/>
                            <stop offset="100%" stop-color="#fca5a5"/>
                        </linearGradient>
                    </defs>
                    <rect width="320" height="180" fill="url(#grad1)"/>
                    <circle cx="50" cy="35" r="18" fill="#fde68a"/>
                    <g opacity="0.58">
                        <circle cx="40" cy="70" r="4" fill="#111827"/>
                        <circle cx="70" cy="80" r="5" fill="#ffffff"/>
                        <circle cx="110" cy="45" r="3" fill="#0f172a"/>
                        <circle cx="160" cy="60" r="4" fill="#ffffff"/>
                        <circle cx="195" cy="82" r="5" fill="#111827"/>
                        <circle cx="245" cy="42" r="3" fill="#ffffff"/>
                        <circle cx="280" cy="90" r="4" fill="#0f172a"/>
                        <circle cx="295" cy="58" r="5" fill="#ffffff"/>
                        <circle cx="135" cy="115" r="4" fill="#111827"/>
                        <circle cx="185" cy="125" r="3" fill="#ffffff"/>
                        <circle cx="240" cy="135" r="5" fill="#111827"/>
                        <circle cx="70" cy="135" r="4" fill="#ffffff"/>
                    </g>
                    <path d="M0 128 Q60 90 120 128 T240 128 T320 128" fill="none" stroke="#16a34a" stroke-width="7"/>
                </svg>`,
            ringing: `
                <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="320" height="180" fill="#f8fafc"/>
                    <rect x="90" y="40" width="140" height="100" fill="#111827"/>
                    <rect x="84" y="34" width="152" height="112" fill="none" stroke="#9ca3af" stroke-width="4"/>
                    <rect x="78" y="28" width="164" height="124" fill="none" stroke="#d1d5db" stroke-width="3"/>
                    <rect x="72" y="22" width="176" height="136" fill="none" stroke="#e5e7eb" stroke-width="2"/>
                </svg>`,
            cleanEdge: `
                <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="320" height="180" fill="#f8fafc"/>
                    <rect x="90" y="40" width="140" height="100" fill="#111827"/>
                </svg>`,
            smooth: `
                <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="smoothGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stop-color="#1d4ed8"/>
                            <stop offset="100%" stop-color="#93c5fd"/>
                        </linearGradient>
                    </defs>
                    <rect width="320" height="180" fill="url(#smoothGrad)"/>
                </svg>`,
            banding: `
                <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="180" x="0" fill="#1e3a8a"/>
                    <rect width="40" height="180" x="40" fill="#1d4ed8"/>
                    <rect width="40" height="180" x="80" fill="#2563eb"/>
                    <rect width="40" height="180" x="120" fill="#3b82f6"/>
                    <rect width="40" height="180" x="160" fill="#60a5fa"/>
                    <rect width="40" height="180" x="200" fill="#7dd3fc"/>
                    <rect width="40" height="180" x="240" fill="#93c5fd"/>
                    <rect width="40" height="180" x="280" fill="#bfdbfe"/>
                </svg>`
        };

        return svgs[type] || svgs.clean;
    }

    const uiText = {
        en: {
            logo: "Learning with Games",
            navHome: "Home",
            navLearning: "Learning",
            navGames: "Games",
            navTest: "Tests",
            navCommunity: "Community",
            footerQuickLinks: "Quick Links",
            breadcrumb: '<a href="homepage.html">Home</a> &gt; <a href="test.html">Tests</a> &gt;Smart Compression Assessment',

            languageLabel: "Language",
            fontSizeLabel: "Font Size",
            heroBadge: " Final Smart Assessment",
            introTitle: "Smart Compression Assessment",
            introDescription: "This final version combines adaptive testing, visual artifact recognition, corrective micro-learning, and personalised learning feedback.",
            infoTitle1: "Adaptive Path",
            infoText1: "Diagnostic questions route each learner to a suitable level.",
            infoTitle2: "Visual Judgement",
            infoText2: "Learners compare compression examples and identify artifacts.",
            infoTitle3: "Micro Follow-up",
            infoText3: "Wrong answers trigger corrective follow-up questions.",
            infoTitle4: "Final Learning Report",
            infoText4: "The result page shows strengths, weaknesses, and review advice.",

            resumeText: "You have an unfinished assessment session.",
            resumeQuiz: "Continue Previous Session",
            clearProgress: "Clear Saved Progress",
            progressCleared: "Saved progress has been cleared.",
            startAssessment: "Start Final Assessment",
            goLearning: "Go to Learning Page",

            progressLabel: "Progress",
            submitAnswer: "Submit Answer",
            previousQuestion: "Previous Question",
            nextQuestion: "Next Question",
            finishAssessment: "Finish Assessment",
            visualHint: "Observe the samples carefully before choosing.",

            statusChooseAnswer: "Please choose an answer before submitting.",
            statusSubmitBeforeNext: "Please submit this question before moving on.",
            statusSelectFollowUp: "Please complete the follow-up task before continuing.",
            statusOptionSaved: "Your selection has been saved. Click Submit Answer to check it.",
            statusFollowUpSaved: "Follow-up selection saved. Click Submit Follow-up to continue.",
            restartConfirm: "Are you sure you want to restart the full assessment?",
            leaveConfirm: "You have unfinished progress. Are you sure you want to leave this page?",

            correctTitle: "✔ Correct",
            incorrectTitle: "✘ Incorrect",
            followUpBadge: "Micro Follow-up",
            followUpButton: "Submit Follow-up",
            followUpCorrect: "Nice recovery",
            followUpIncorrect: "Review needed",

            routeDiagnostic: "Diagnostic Route",
            routeDiagnosticDesc: "The system is currently diagnosing your level.",
            routeFoundation: "Foundation Path",
            routeFoundationDesc: "You are on the foundation route focused on core concepts.",
            routeIntermediate: "Intermediate Path",
            routeIntermediateDesc: "You are on the intermediate route with method comparison and visual recognition.",
            routeAdvanced: "Advanced Path",
            routeAdvancedDesc: "You are on the advanced route with deeper compression reasoning.",
            routeRetry: "Retry Mode",
            routeRetryDesc: "You are retrying only the questions you missed previously.",

            difficultyDiagnostic: "Diagnostic",
            difficultyFoundation: "Foundation",
            difficultyIntermediate: "Intermediate",
            difficultyAdvanced: "Advanced",
            difficultyRetry: "Retry",

            questionLabel: "Question",
            ofLabel: "of",
            resultTitle: "Final Learning Report",
            resultSubtitle: "You have completed the smart compression assessment.",
            retryWrong: "Retry Wrong Questions Only",
            restartFull: "Restart Full Assessment",
            reviewLearning: "Review Learning Page",
            profileTitle: "Capability Profile",
            suggestionsTitle: "Recommended Next Steps",
            reviewTitle: "Targeted Review: Questions to Revisit",
            routeSummaryTitle: "Route Summary",

            modeLabel: "Mode",
            routeLabel: "Route",
            accuracyLabel: "Accuracy",
            questionCountLabel: "Questions",
            noWrongAnswers: "Excellent. You answered every main question correctly.",
            percentagePrefix: "Your score is",
            learnerFoundation: "Concept Builder",
            learnerVisual: "Artifact Detective",
            learnerMethods: "Compression Strategist",
            learnerAdvanced: "Frequency Explorer",
            learnerBalanced: "Compression Master",

            categoryBasics: "Basic Concepts",
            categoryVisual: "Visual Recognition",
            categoryMethods: "Compression Methods",
            categoryAdvanced: "Advanced Reasoning",
            profileStrong: "Strong",
            profileDeveloping: "Developing",
            profileNeedsWork: "Needs Work",

            suggestionBasics: "Review compression, redundancy, and lossy vs lossless concepts.",
            suggestionVisual: "Practise visual artifacts: blockiness, ringing, and banding.",
            suggestionMethods: "Review how JPEG, RLE, and perceptual methods reduce data.",
            suggestionAdvancedArea: "Revisit DCT and the trade-off between visual quality and file size.",
            suggestionFoundation: "Because you were routed to the foundation path, revisit the Learning page before advanced tasks.",
            suggestionIntermediate: "Strengthen method comparison and visual judgement with a second attempt.",
            suggestionAdvancedPath: "You handled the advanced path. Improve precision on subtle visual artifacts.",
            suggestionRetry: "Retry the missed questions and compare your new answers with the explanations.",
            suggestionHighScore: "Great performance. Try explaining each answer in your own words.",

            scoreSummaryHigh: "Great job. Your answers show strong compression understanding and visual judgement.",
            scoreSummaryMid: "Good progress. You understand many key ideas, but several areas still need review.",
            scoreSummaryLow: "Review the Learning page and revisit the core compression concepts before retrying.",

            yourAnswer: "Your answer:",
            correctAnswer: "Correct answer:",
            noAnswer: "No answer",
            adaptiveAssignedFoundation: "The diagnostic stage placed you on the Foundation Path.",
            adaptiveAssignedIntermediate: "The diagnostic stage placed you on the Intermediate Path.",
            adaptiveAssignedAdvanced: "The diagnostic stage placed you on the Advanced Path."
        },
        zh: {
            logo: "Learning with Games",
            navHome: "主页",
            navLearning: "学习",
            navGames: "游戏",
            navTest: "测试",
            navCommunity: "社区",
            footerQuickLinks: "快捷导航",
            breadcrumb: '<a href="homepage.html">主页</a> &gt; <a href="test.html">测试</a> &gt; 智能压缩评测',

            languageLabel: "语言",
            fontSizeLabel: "字号",
            heroBadge: "最终版智能评测",
            introTitle: "智能压缩评测",
            introDescription: "最终版结合自适应测试、视觉伪影识别、纠错式微学习和个性化学习反馈。",
            infoTitle1: "自适应路径",
            infoText1: "诊断题会把学习者分配到更合适的难度路径。",
            infoTitle2: "视觉判断",
            infoText2: "学习者需要比较压缩样本并识别伪影。",
            infoTitle3: "追问纠错",
            infoText3: "答错后会触发一个纠错追问题。",
            infoTitle4: "最终学习报告",
            infoText4: "结果页会显示优势、弱点和复习建议。",

            resumeText: "你有一个未完成的评测进度。",
            resumeQuiz: "继续上次评测",
            clearProgress: "清除保存进度",
            progressCleared: "已清除保存的进度。",
            startAssessment: "开始最终评测",
            goLearning: "前往学习页面",

            progressLabel: "进度",
            submitAnswer: "提交答案",
            previousQuestion: "上一题",
            nextQuestion: "下一题",
            finishAssessment: "完成评测",
            visualHint: "请先仔细观察样本，再选择答案。",

            statusChooseAnswer: "请先选择一个答案再提交。",
            statusSubmitBeforeNext: "请先提交当前题目，再进入下一题。",
            statusSelectFollowUp: "请先完成追问题，再继续下一题。",
            statusOptionSaved: "已保存你的选择，点击“提交答案”即可检查。",
            statusFollowUpSaved: "已保存追问题选择，点击“提交追问题”继续。",
            restartConfirm: "确定要重新开始完整评测吗？",
            leaveConfirm: "你还有未完成的进度，确定要离开当前页面吗？",

            correctTitle: "✔ 回答正确",
            incorrectTitle: "✘ 回答错误",
            followUpBadge: "追问题",
            followUpButton: "提交追问题",
            followUpCorrect: "纠正成功",
            followUpIncorrect: "还需要复习",

            routeDiagnostic: "诊断路径",
            routeDiagnosticDesc: "系统正在判断你的当前水平。",
            routeFoundation: "基础路径",
            routeFoundationDesc: "你当前处于基础路径，重点考察核心概念。",
            routeIntermediate: "进阶路径",
            routeIntermediateDesc: "你当前处于进阶路径，重点考察方法比较和视觉识别。",
            routeAdvanced: "高级路径",
            routeAdvancedDesc: "你当前处于高级路径，重点考察更深层的压缩推理。",
            routeRetry: "错题重做模式",
            routeRetryDesc: "你正在重做之前答错的题目。",

            difficultyDiagnostic: "诊断",
            difficultyFoundation: "基础",
            difficultyIntermediate: "进阶",
            difficultyAdvanced: "高级",
            difficultyRetry: "重做",

            questionLabel: "第",
            ofLabel: "题，共",
            resultTitle: "最终学习报告",
            resultSubtitle: "你已经完成了智能压缩评测。",
            retryWrong: "只重做错题",
            restartFull: "重新开始完整评测",
            reviewLearning: "回顾学习页面",
            profileTitle: "能力画像",
            suggestionsTitle: "下一步建议",
            reviewTitle: "针对性回顾：需要复习的题目",
            routeSummaryTitle: "路径总结",

            modeLabel: "模式",
            routeLabel: "路径",
            accuracyLabel: "正确率",
            questionCountLabel: "题目数量",
            noWrongAnswers: "太棒了，你所有主问题都答对了。",
            percentagePrefix: "你的得分是",
            learnerFoundation: "概念搭建者",
            learnerVisual: "伪影侦探",
            learnerMethods: "压缩策略家",
            learnerAdvanced: "频域探索者",
            learnerBalanced: "压缩大师",

            categoryBasics: "基础概念",
            categoryVisual: "视觉识别",
            categoryMethods: "压缩方法",
            categoryAdvanced: "高级推理",
            profileStrong: "优势",
            profileDeveloping: "发展中",
            profileNeedsWork: "待加强",

            suggestionBasics: "建议复习压缩、冗余、有损与无损等核心概念。",
            suggestionVisual: "建议练习视觉伪影识别：方块效应、振铃和色带。",
            suggestionMethods: "建议回顾 JPEG、RLE 和感知压缩如何减少数据。",
            suggestionAdvancedArea: "建议重新理解 DCT 以及画质与文件大小之间的权衡。",
            suggestionFoundation: "由于你被分配到基础路径，建议先回到 Learning 页面巩固内容。",
            suggestionIntermediate: "建议加强方法比较和视觉判断，然后再尝试一次。",
            suggestionAdvancedPath: "你完成了高级路径，可以继续提升细微视觉伪影判断精度。",
            suggestionRetry: "建议重做错题，并将新答案与解释进行对照。",
            suggestionHighScore: "本次表现很好，建议尝试用自己的话解释每一道题。",

            scoreSummaryHigh: "表现很好。你的答案显示你对压缩理解和视觉判断都比较扎实。",
            scoreSummaryMid: "进步不错。你掌握了不少关键概念，但仍有部分区域需要复习。",
            scoreSummaryLow: "建议先回到 Learning 页面复习核心压缩概念，再重新尝试。",

            yourAnswer: "你的答案：",
            correctAnswer: "正确答案：",
            noAnswer: "未作答",
            adaptiveAssignedFoundation: "诊断阶段将你分配到了基础路径。",
            adaptiveAssignedIntermediate: "诊断阶段将你分配到了进阶路径。",
            adaptiveAssignedAdvanced: "诊断阶段将你分配到了高级路径。"
        }
    };

    const questions = [
        {
            id: "diag-1",
            phase: "diagnostic",
            type: "mcq",
            category: "basics",
            title: { en: "Compression Goal", zh: "压缩目标" },
            prompt: { en: "What is the main goal of data compression?", zh: "数据压缩的主要目标是什么？" },
            options: [
                { en: "To make images more colourful", zh: "让图像颜色更丰富" },
                { en: "To reduce file size while keeping useful information", zh: "在保留有用信息的前提下减小文件体积" },
                { en: "To add more pixels to a file", zh: "给文件增加更多像素" },
                { en: "To remove all visual details", zh: "移除所有视觉细节" }
            ],
            answer: 1,
            explanation: {
                en: "Compression reduces the amount of data needed for storage or transmission while preserving useful information.",
                zh: "压缩的目标是在保留有用信息的同时，减少存储或传输所需的数据量。"
            },
            followUp: {
                prompt: { en: "Which phrase best matches efficient compression?", zh: "哪句话最符合高效压缩？" },
                options: [
                    { en: "Smaller files with acceptable quality", zh: "文件更小，同时质量仍可接受" },
                    { en: "Larger files with no change", zh: "文件更大且没有变化" },
                    { en: "More noise in every image", zh: "所有图像都增加噪点" }
                ],
                answer: 0,
                explanation: {
                    en: "Efficient compression balances file size reduction with acceptable retained quality.",
                    zh: "高效压缩的关键是兼顾文件体积减小和可接受质量。"
                }
            }
        },
        {
            id: "diag-2",
            phase: "diagnostic",
            type: "visual",
            category: "visual",
            title: { en: "Visual Artifact Spotting", zh: "视觉伪影识别" },
            prompt: { en: "Which sample shows stronger blocky compression artifacts?", zh: "哪一个样本显示出更明显的方块压缩伪影？" },
            visuals: [
                { title: { en: "Sample A", zh: "样本 A" }, caption: { en: "Cleaner edges and transitions", zh: "边缘和过渡更干净" }, svg: makeScene("clean") },
                { title: { en: "Sample B", zh: "样本 B" }, caption: { en: "Visible large colour blocks", zh: "能看到明显的大色块" }, svg: makeScene("blocky") }
            ],
            options: [
                { en: "Sample A", zh: "样本 A" },
                { en: "Sample B", zh: "样本 B" },
                { en: "Both are identical", zh: "两者完全一样" },
                { en: "Neither shows artifacts", zh: "两者都没有伪影" }
            ],
            answer: 1,
            explanation: {
                en: "Sample B shows blockiness, a common artifact when compression is too strong.",
                zh: "样本 B 出现明显方块感，这是压缩过强时常见的伪影。"
            },
            followUp: {
                prompt: { en: "Which artifact looks like visible squares or blocks?", zh: "哪种伪影通常表现为可见方块？" },
                options: [
                    { en: "Blockiness", zh: "方块效应" },
                    { en: "Perfect reconstruction", zh: "完美重建" },
                    { en: "Sharpness gain", zh: "锐化增强" }
                ],
                answer: 0,
                explanation: {
                    en: "Blockiness is one of the clearest visual signs of heavy image compression.",
                    zh: "方块效应是图像压缩过强时最典型的视觉特征之一。"
                }
            }
        },
        {
            id: "foundation-1",
            phase: "foundation",
            type: "mcq",
            category: "basics",
            title: { en: "Lossless Compression", zh: "无损压缩" },
            prompt: { en: "Which type of compression keeps all original data?", zh: "哪一种压缩方式会保留全部原始数据？" },
            options: [
                { en: "Lossy compression", zh: "有损压缩" },
                { en: "Lossless compression", zh: "无损压缩" },
                { en: "Random compression", zh: "随机压缩" },
                { en: "Visual-only compression", zh: "仅视觉压缩" }
            ],
            answer: 1,
            explanation: { en: "Lossless compression allows exact reconstruction of the original data.", zh: "无损压缩可以完整恢复原始数据。" },
            followUp: {
                prompt: { en: "When exact recovery is required, which type is safer?", zh: "当必须精确恢复原始数据时，哪种更安全？" },
                options: [{ en: "Lossless", zh: "无损" }, { en: "Lossy", zh: "有损" }, { en: "Either one", zh: "两者都一样" }],
                answer: 0,
                explanation: { en: "Use lossless compression when the original must be preserved exactly.", zh: "当原始内容必须完整保留时，应使用无损压缩。" }
            }
        },
        {
            id: "foundation-2",
            phase: "foundation",
            type: "visual",
            category: "methods",
            title: { en: "RLE Suitability", zh: "RLE 适用场景" },
            prompt: { en: "Which image is more suitable for Run-Length Encoding?", zh: "哪种图像更适合行程编码 RLE？" },
            visuals: [
                { title: { en: "Image A", zh: "图像 A" }, caption: { en: "Repeated stripes", zh: "重复条纹" }, svg: makeScene("stripes") },
                { title: { en: "Image B", zh: "图像 B" }, caption: { en: "Irregular details", zh: "不规则细节" }, svg: makeScene("noisy") }
            ],
            options: [
                { en: "Image A", zh: "图像 A" },
                { en: "Image B", zh: "图像 B" },
                { en: "Both are equal", zh: "两者一样" },
                { en: "Neither can be compressed", zh: "两者都不能压缩" }
            ],
            answer: 0,
            explanation: { en: "RLE works well when the same values repeat in long runs.", zh: "RLE 适合连续重复值较多的图像。" },
            followUp: {
                prompt: { en: "Why does RLE work better on repeated patterns?", zh: "为什么 RLE 更适合重复模式？" },
                options: [
                    { en: "It stores repeated values more compactly", zh: "它能更紧凑地存储重复值" },
                    { en: "It adds more random noise", zh: "它会增加随机噪点" },
                    { en: "It doubles the image size", zh: "它会把图像体积翻倍" }
                ],
                answer: 0,
                explanation: { en: "Repeated values can be represented efficiently as a value plus a count.", zh: "重复值可以被表示为“值 + 次数”，因此更高效。" }
            }
        },
        {
            id: "foundation-3",
            phase: "foundation",
            type: "mcq",
            category: "basics",
            title: { en: "Transmission Benefit", zh: "传输优势" },
            prompt: { en: "Why does compression help online transmission?", zh: "为什么压缩有利于在线传输？" },
            options: [
                { en: "Smaller files usually require less bandwidth", zh: "更小的文件通常需要更少带宽" },
                { en: "Compression increases screen size", zh: "压缩会增大屏幕尺寸" },
                { en: "Compression removes every colour", zh: "压缩会移除所有颜色" },
                { en: "Compression changes the network provider", zh: "压缩会改变网络服务商" }
            ],
            answer: 0,
            explanation: { en: "Smaller files require less data transfer, so loading can be faster.", zh: "文件更小时，需要传输的数据更少，因此加载通常更快。" }
        },
        {
            id: "foundation-4",
            phase: "foundation",
            type: "mcq",
            category: "methods",
            title: { en: "Redundancy", zh: "冗余" },
            prompt: { en: "What does redundancy mean in data compression?", zh: "在数据压缩中，冗余是什么意思？" },
            options: [
                { en: "Repeated or predictable information", zh: "重复或可预测的信息" },
                { en: "Encrypted private data", zh: "加密的私密数据" },
                { en: "Only audio data", zh: "只有音频数据" },
                { en: "Printed data", zh: "打印出来的数据" }
            ],
            answer: 0,
            explanation: { en: "Compression often represents repeated or predictable patterns more efficiently.", zh: "压缩通常会用更高效的方式表示重复或可预测模式。" }
        },
        {
            id: "intermediate-1",
            phase: "intermediate",
            type: "mcq",
            category: "methods",
            title: { en: "JPEG Reasoning", zh: "JPEG 原理判断" },
            prompt: { en: "Why is JPEG considered a lossy format?", zh: "为什么 JPEG 被认为是有损格式？" },
            options: [
                { en: "It discards some image information to reduce file size", zh: "它会丢弃部分图像信息来减小文件体积" },
                { en: "It always increases file size", zh: "它总会增大文件体积" },
                { en: "It only stores text", zh: "它只能存储文本" },
                { en: "It has no algorithm", zh: "它没有算法" }
            ],
            answer: 0,
            explanation: { en: "JPEG reduces file size by discarding information that is less noticeable to human vision.", zh: "JPEG 通过舍弃人眼不太容易察觉的信息来减小体积。" }
        },
        {
            id: "intermediate-2",
            phase: "intermediate",
            type: "visual",
            category: "visual",
            title: { en: "Ringing Artifact", zh: "振铃伪影" },
            prompt: { en: "Which sample shows ringing around strong edges?", zh: "哪一个样本显示了强边缘附近的振铃？" },
            visuals: [
                { title: { en: "Sample A", zh: "样本 A" }, caption: { en: "Halo-like outlines", zh: "类似光晕的轮廓" }, svg: makeScene("ringing") },
                { title: { en: "Sample B", zh: "样本 B" }, caption: { en: "Clean edge", zh: "干净边缘" }, svg: makeScene("cleanEdge") }
            ],
            options: [
                { en: "Sample A", zh: "样本 A" },
                { en: "Sample B", zh: "样本 B" },
                { en: "Both are clean", zh: "两者都干净" },
                { en: "Neither contains edges", zh: "两者都没有边缘" }
            ],
            answer: 0,
            explanation: { en: "Ringing often appears as extra halo-like contours near sharp edges.", zh: "振铃通常表现为锐利边缘附近的额外光晕轮廓。" }
        },
        {
            id: "intermediate-3",
            phase: "intermediate",
            type: "mcq",
            category: "advanced",
            title: { en: "Quality Trade-off", zh: "质量权衡" },
            prompt: { en: "A webpage needs fast loading but acceptable quality. What is the best compromise?", zh: "网页需要加载快但画质可接受，最合理的折中是什么？" },
            options: [
                { en: "Use moderate compression", zh: "使用适中的压缩" },
                { en: "Always keep files uncompressed", zh: "始终不压缩" },
                { en: "Remove all details", zh: "移除所有细节" },
                { en: "Store every image as a huge bitmap", zh: "把图片存成巨大位图" }
            ],
            answer: 0,
            explanation: { en: "Practical design balances visual quality with smaller file size and faster loading.", zh: "实际设计通常会在画质、文件大小和加载速度之间平衡。" }
        },
        {
            id: "intermediate-4",
            phase: "intermediate",
            type: "mcq",
            category: "methods",
            title: { en: "Redundancy Handling", zh: "冗余处理" },
            prompt: { en: "How does compression use redundancy?", zh: "压缩如何利用冗余？" },
            options: [
                { en: "It stores repeated patterns more efficiently", zh: "更高效地存储重复模式" },
                { en: "It adds more repeated patterns", zh: "增加更多重复模式" },
                { en: "It ignores every repeated value", zh: "忽略所有重复值" },
                { en: "It deletes the file structure first", zh: "先删除文件结构" }
            ],
            answer: 0,
            explanation: { en: "Repeated patterns can often be represented with fewer bits.", zh: "重复模式通常可以用更少比特表示。" }
        },
        {
            id: "advanced-1",
            phase: "advanced",
            type: "mcq",
            category: "advanced",
            title: { en: "DCT Role", zh: "DCT 作用" },
            prompt: { en: "What is the role of DCT in image compression?", zh: "DCT 在图像压缩中的作用是什么？" },
            options: [
                { en: "It transforms image data into frequency components", zh: "把图像数据转换为频率分量" },
                { en: "It doubles image resolution", zh: "把图像分辨率翻倍" },
                { en: "It converts images into sound", zh: "把图像变成声音" },
                { en: "It stores every pixel unchanged", zh: "不改变地保存每个像素" }
            ],
            answer: 0,
            explanation: { en: "DCT separates image data into frequency components, enabling more efficient reduction of less important details.", zh: "DCT 将图像分解为频率分量，便于减少不太重要的细节。" }
        },
        {
            id: "advanced-2",
            phase: "advanced",
            type: "visual",
            category: "visual",
            title: { en: "Colour Banding", zh: "色带识别" },
            prompt: { en: "Which sample shows colour banding?", zh: "哪一个样本显示了色带现象？" },
            visuals: [
                { title: { en: "Sample A", zh: "样本 A" }, caption: { en: "Smooth tonal transition", zh: "平滑色调过渡" }, svg: makeScene("smooth") },
                { title: { en: "Sample B", zh: "样本 B" }, caption: { en: "Visible step-like colour bands", zh: "明显分层色带" }, svg: makeScene("banding") }
            ],
            options: [
                { en: "Sample A", zh: "样本 A" },
                { en: "Sample B", zh: "样本 B" },
                { en: "Both are smooth", zh: "两者都平滑" },
                { en: "Neither uses colour", zh: "两者都没有颜色" }
            ],
            answer: 1,
            explanation: { en: "Banding appears as visible steps where colour should change smoothly.", zh: "色带表现为本应平滑变化的颜色出现明显分层。" }
        },
        {
            id: "advanced-3",
            phase: "advanced",
            type: "mcq",
            category: "advanced",
            title: { en: "Strategy Choice", zh: "策略选择" },
            prompt: { en: "You need smaller web images, but artifacts are obvious. What should you do?", zh: "你需要更小的网页图片，但伪影已经明显。应该怎么做？" },
            options: [
                { en: "Reduce compression strength slightly", zh: "适当降低压缩强度" },
                { en: "Keep compressing until all detail is gone", zh: "继续压缩直到细节消失" },
                { en: "Assume artifacts never matter", zh: "认为伪影永远不重要" },
                { en: "Ignore the visual result", zh: "忽略视觉结果" }
            ],
            answer: 0,
            explanation: { en: "Good compression balances file size against visible quality.", zh: "好的压缩会在文件体积与可见质量之间平衡。" }
        },
        {
            id: "advanced-4",
            phase: "advanced",
            type: "mcq",
            category: "methods",
            title: { en: "Perceptual Coding", zh: "感知编码" },
            prompt: { en: "Why can lossy compression be useful even when data is removed?", zh: "为什么即使丢失数据，有损压缩仍然有用？" },
            options: [
                { en: "Not all removed information is equally noticeable", zh: "并非所有被移除信息都容易被察觉" },
                { en: "It always preserves every detail", zh: "它总能保留每个细节" },
                { en: "People cannot see any differences", zh: "人看不出任何差异" },
                { en: "Lossy compression uses no algorithm", zh: "有损压缩不用算法" }
            ],
            answer: 0,
            explanation: { en: "Perceptual coding uses the fact that human vision is more sensitive to some changes than others.", zh: "感知编码利用了人眼对不同变化敏感度不同这一点。" }
        }
    ];

    const questionMap = Object.fromEntries(questions.map(q => [q.id, q]));
    const diagnosticIds = questions.filter(q => q.phase === "diagnostic").map(q => q.id);
    const branchIds = {
        foundation: questions.filter(q => q.phase === "foundation").map(q => q.id),
        intermediate: questions.filter(q => q.phase === "intermediate").map(q => q.id),
        advanced: questions.filter(q => q.phase === "advanced").map(q => q.id)
    };

    const state = {
        currentLang: "en",
        fontSize: 16,
        savedSnapshot: null,
        session: null
    };

    const el = {};
    const ids = [
        "breadcrumbText", "logoText", "navHome", "navLearning", "navGames", "navTest", "navCommunity",
        "footerTitle", "footerQuickLinks", "footerHome", "footerLearning", "footerGames", "footerTest", "footerCommunity",
        "languageLabel", "fontSizeLabel", "heroBadge", "introTitle", "introDescription",
        "infoTitle1", "infoText1", "infoTitle2", "infoText2", "infoTitle3", "infoText3", "infoTitle4", "infoText4",
        "resumeBox", "resumeText", "resumeQuizBtn", "clearProgressBtn", "startQuizBtn", "goLearningBtn",
        "introScreen", "quizScreen", "resultScreen", "routeBadge", "routeDescription", "progressLabel", "progressCount",
        "progressTrack", "progressBar", "difficultyBadge", "questionNumberText", "questionTitle", "questionPrompt",
        "visualHint", "visualZone", "optionsContainer", "submitBtn", "prevBtn", "nextBtn", "statusMessage",
        "feedbackCard", "feedbackTitle", "feedbackText", "followUpCard", "followUpBadge", "followUpTitle",
        "followUpPrompt", "followUpOptions", "submitFollowUpBtn", "followUpFeedback", "followUpFeedbackTitle",
        "followUpFeedbackText", "resultRouteBadge", "learnerTag", "resultTitle", "resultSubtitle", "scoreText",
        "percentageText", "performanceText", "routeSummaryTitle", "routeSummaryGrid", "profileTitle", "profileGrid",
        "suggestionsTitle", "suggestionsList", "reviewTitle", "wrongAnswersList", "retryWrongBtn",
        "restartAssessmentBtn", "reviewLearningBtn"
    ];
    ids.forEach(id => {
        el[id] = document.getElementById(id);
    });
    el.langButtons = document.querySelectorAll("[data-lang]");
    el.fontButtons = document.querySelectorAll("[data-font]");

    function t(key) {
        return uiText[state.currentLang][key] || key;
    }

    function saveSnapshot(snapshot) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        } catch (error) {
            console.error("Failed to save state:", error);
        }
    }

    function loadSnapshot() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error("Failed to load state:", error);
            return null;
        }
    }

    function clearSnapshot() {
        localStorage.removeItem(STORAGE_KEY);
    }

    function showScreen(screen) {
        el.introScreen.classList.add("hidden");
        el.quizScreen.classList.add("hidden");
        el.resultScreen.classList.add("hidden");
        if (screen === "intro") el.introScreen.classList.remove("hidden");
        if (screen === "quiz") el.quizScreen.classList.remove("hidden");
        if (screen === "result") el.resultScreen.classList.remove("hidden");
    }

    function showStatus(message, type = "info") {
        el.statusMessage.textContent = message;
        el.statusMessage.className = `status-message ${type}`;
    }

    function hideStatus() {
        el.statusMessage.textContent = "";
        el.statusMessage.className = "status-message hidden";
    }

    function newSession(mode, idsList) {
        const answers = {};
        const submitted = {};
        const followUp = {};
        idsList.forEach(id => {
            answers[id] = null;
            submitted[id] = false;
            followUp[id] = { selected: null, submitted: false, correct: null };
        });
        return {
            mode,
            stage: "quiz",
            questionIds: [...idsList],
            currentIndex: 0,
            answers,
            submitted,
            followUp,
            assignedBranch: null
        };
    }

    function currentId() {
        return state.session.questionIds[state.session.currentIndex];
    }

    function currentQuestion() {
        return questionMap[currentId()];
    }

    function mainCorrect(id) {
        const q = questionMap[id];
        return state.session.answers[id] === q.answer;
    }

    function needsFollowUp(id) {
        const q = questionMap[id];
        return !!q.followUp && state.session.submitted[id] && !mainCorrect(id);
    }

    function routeKey() {
        if (!state.session) return "routeDiagnostic";
        if (state.session.mode === "retry") return "routeRetry";
        if (!state.session.assignedBranch) return "routeDiagnostic";
        return {
            foundation: "routeFoundation",
            intermediate: "routeIntermediate",
            advanced: "routeAdvanced"
        }[state.session.assignedBranch] || "routeDiagnostic";
    }

    function routeDescKey() {
        if (!state.session) return "routeDiagnosticDesc";
        if (state.session.mode === "retry") return "routeRetryDesc";
        if (!state.session.assignedBranch) return "routeDiagnosticDesc";
        return {
            foundation: "routeFoundationDesc",
            intermediate: "routeIntermediateDesc",
            advanced: "routeAdvancedDesc"
        }[state.session.assignedBranch] || "routeDiagnosticDesc";
    }

    function difficultyLabel(q) {
        if (state.session.mode === "retry") return t("difficultyRetry");
        return {
            diagnostic: t("difficultyDiagnostic"),
            foundation: t("difficultyFoundation"),
            intermediate: t("difficultyIntermediate"),
            advanced: t("difficultyAdvanced")
        }[q.phase] || t("difficultyDiagnostic");
    }

    function setLanguage(lang) {
        state.currentLang = lang;
        el.langButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));

        el.logoText.textContent = t("logo");
        el.navHome.textContent = t("navHome");
        el.navLearning.textContent = t("navLearning");
        el.navGames.textContent = t("navGames");
        el.navTest.textContent = t("navTest");
        el.navCommunity.textContent = t("navCommunity");

        el.footerTitle.textContent = t("logo");
        el.footerQuickLinks.textContent = t("footerQuickLinks");
        el.footerHome.textContent = t("navHome");
        el.footerLearning.textContent = t("navLearning");
        el.footerGames.textContent = t("navGames");
        el.footerTest.textContent = t("navTest");
        el.footerCommunity.textContent = t("navCommunity");

        el.breadcrumbText.innerHTML = t("breadcrumb");
        el.languageLabel.textContent = t("languageLabel");
        el.fontSizeLabel.textContent = t("fontSizeLabel");
        el.heroBadge.textContent = t("heroBadge");
        el.introTitle.textContent = t("introTitle");
        el.introDescription.textContent = t("introDescription");

        ["infoTitle1", "infoText1", "infoTitle2", "infoText2", "infoTitle3", "infoText3", "infoTitle4", "infoText4"].forEach(id => {
            el[id].textContent = t(id);
        });

        el.resumeText.textContent = t("resumeText");
        el.resumeQuizBtn.textContent = t("resumeQuiz");
        el.clearProgressBtn.textContent = t("clearProgress");
        el.startQuizBtn.textContent = t("startAssessment");
        el.goLearningBtn.textContent = t("goLearning");
        el.progressLabel.textContent = t("progressLabel");
        el.submitBtn.textContent = t("submitAnswer");
        el.prevBtn.textContent = t("previousQuestion");
        el.followUpBadge.textContent = t("followUpBadge");
        el.submitFollowUpBtn.textContent = t("followUpButton");
        el.visualHint.textContent = t("visualHint");

        el.resultTitle.textContent = t("resultTitle");
        el.resultSubtitle.textContent = t("resultSubtitle");
        el.routeSummaryTitle.textContent = t("routeSummaryTitle");
        el.profileTitle.textContent = t("profileTitle");
        el.suggestionsTitle.textContent = t("suggestionsTitle");
        el.reviewTitle.textContent = t("reviewTitle");
        el.retryWrongBtn.textContent = t("retryWrong");
        el.restartAssessmentBtn.textContent = t("restartFull");
        el.reviewLearningBtn.textContent = t("reviewLearning");

        if (state.session?.stage === "quiz") renderQuiz();
        if (state.session?.stage === "result") renderResult();
        showResumeIfAvailable(false);
        persist();
    }

    function setFontSize(size) {
        state.fontSize = Number(size);
        document.documentElement.style.setProperty("--base-font-size", `${state.fontSize}px`);
        el.fontButtons.forEach(btn => btn.classList.toggle("active", Number(btn.dataset.font) === state.fontSize));
        persist();
    }

    function renderVisuals(q) {
        if (q.type !== "visual") {
            el.visualHint.classList.add("hidden");
            el.visualZone.classList.add("hidden");
            el.visualZone.innerHTML = "";
            return;
        }

        el.visualHint.classList.remove("hidden");
        el.visualZone.classList.remove("hidden");
        el.visualZone.innerHTML = q.visuals.map(v => `
            <div class="visual-card">
                <h4>${v.title[state.currentLang]}</h4>
                <div class="visual-frame">${v.svg}</div>
                <p class="visual-caption">${v.caption[state.currentLang]}</p>
            </div>
        `).join("");
    }

    function renderOptions(q) {
        const id = q.id;
        const selected = state.session.answers[id];
        const submitted = state.session.submitted[id];

        el.optionsContainer.innerHTML = q.options.map((option, index) => {
            const classes = ["option"];
            if (selected === index) classes.push("selected");
            if (submitted) {
                classes.push("locked");
                if (index === q.answer) classes.push("correct");
                if (selected === index && index !== q.answer) classes.push("wrong");
            }
            return `
                <div class="${classes.join(" ")}" tabindex="0" data-option="${index}">
                    <input type="radio" name="mainQuestion" value="${index}" ${selected === index ? "checked" : ""} ${submitted ? "disabled" : ""}>
                    <label>${option[state.currentLang]}</label>
                </div>
            `;
        }).join("");

        el.optionsContainer.querySelectorAll(".option").forEach(item => {
            const choose = () => {
                if (submitted) return;
                state.session.answers[id] = Number(item.dataset.option);
                showStatus(t("statusOptionSaved"), "info");
                persist();
                renderQuiz();
            };
            item.addEventListener("click", choose);
            item.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    choose();
                }
            });
        });
    }

    function renderFeedback(q) {
        const id = q.id;
        if (!state.session.submitted[id]) {
            el.feedbackCard.className = "feedback-card";
            el.feedbackTitle.textContent = "";
            el.feedbackText.textContent = "";
            return;
        }

        const correct = mainCorrect(id);
        el.feedbackCard.className = `feedback-card show ${correct ? "correct" : "incorrect"}`;
        el.feedbackTitle.textContent = correct ? t("correctTitle") : t("incorrectTitle");
        el.feedbackText.textContent = q.explanation[state.currentLang];
    }

    function renderFollowUp(q) {
        const id = q.id;
        if (!needsFollowUp(id)) {
            el.followUpCard.classList.add("hidden");
            el.followUpTitle.textContent = "";
            el.followUpPrompt.textContent = "";
            el.followUpOptions.innerHTML = "";
            el.followUpFeedback.classList.add("hidden");
            return;
        }

        const fu = q.followUp;
        const fuState = state.session.followUp[id];

        el.followUpCard.classList.remove("hidden");
        el.followUpTitle.textContent = t("followUpBadge");
        el.followUpPrompt.textContent = fu.prompt[state.currentLang];

        el.followUpOptions.innerHTML = fu.options.map((option, index) => {
            const classes = ["follow-up-option"];
            if (fuState.selected === index) classes.push("selected");
            if (fuState.submitted) {
                classes.push("locked");
                if (index === fu.answer) classes.push("correct");
                if (fuState.selected === index && index !== fu.answer) classes.push("wrong");
            }
            return `
                <div class="${classes.join(" ")}" tabindex="0" data-follow="${index}">
                    <input type="radio" name="followUpQuestion" value="${index}" ${fuState.selected === index ? "checked" : ""} ${fuState.submitted ? "disabled" : ""}>
                    <label>${option[state.currentLang]}</label>
                </div>
            `;
        }).join("");

        el.followUpOptions.querySelectorAll(".follow-up-option").forEach(item => {
            const choose = () => {
                if (fuState.submitted) return;
                fuState.selected = Number(item.dataset.follow);
                showStatus(t("statusFollowUpSaved"), "info");
                persist();
                renderFollowUp(q);
            };
            item.addEventListener("click", choose);
            item.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    choose();
                }
            });
        });

        if (fuState.submitted) {
            el.followUpFeedback.classList.remove("hidden");
            el.followUpFeedbackTitle.textContent = fuState.correct ? t("followUpCorrect") : t("followUpIncorrect");
            el.followUpFeedbackText.textContent = fu.explanation[state.currentLang];
        } else {
            el.followUpFeedback.classList.add("hidden");
            el.followUpFeedbackTitle.textContent = "";
            el.followUpFeedbackText.textContent = "";
        }
    }

    function updateProgress() {
        const total = state.session.questionIds.length;
        const current = state.session.currentIndex + 1;
        const submittedCount = state.session.questionIds.filter(id => state.session.submitted[id]).length;
        const percentage = Math.round((submittedCount / total) * 100);

        el.progressCount.textContent = `${current} / ${total}`;
        el.progressBar.style.width = `${percentage}%`;
        el.progressTrack.setAttribute("aria-valuenow", String(percentage));
    }

    function renderQuiz() {
        const q = currentQuestion();
        el.routeBadge.textContent = t(routeKey());
        el.routeDescription.textContent = t(routeDescKey());
        updateProgress();

        el.difficultyBadge.textContent = difficultyLabel(q);
        el.questionNumberText.textContent =
            state.currentLang === "en"
                ? `${t("questionLabel")} ${state.session.currentIndex + 1} ${t("ofLabel")} ${state.session.questionIds.length}`
                : `${t("questionLabel")} ${state.session.currentIndex + 1} ${t("ofLabel")} ${state.session.questionIds.length}`;
        el.questionTitle.textContent = q.title[state.currentLang];
        el.questionPrompt.textContent = q.prompt[state.currentLang];

        renderVisuals(q);
        renderOptions(q);
        renderFeedback(q);
        renderFollowUp(q);

        el.submitBtn.disabled = state.session.submitted[q.id];
        el.prevBtn.disabled = state.session.currentIndex === 0;
        el.nextBtn.textContent = state.session.currentIndex === state.session.questionIds.length - 1 ? t("finishAssessment") : t("nextQuestion");

        if (!state.session.submitted[q.id] && state.session.answers[q.id] === null) hideStatus();
    }

    function submitMainAnswer() {
        const q = currentQuestion();
        if (state.session.answers[q.id] === null) {
            showStatus(t("statusChooseAnswer"), "error");
            return;
        }
        state.session.submitted[q.id] = true;
        hideStatus();
        persist();
        renderQuiz();
    }

    function submitFollowUp() {
        const q = currentQuestion();
        const fuState = state.session.followUp[q.id];

        if (!needsFollowUp(q.id)) return;
        if (fuState.selected === null) {
            showStatus(t("statusSelectFollowUp"), "error");
            return;
        }

        fuState.submitted = true;
        fuState.correct = fuState.selected === q.followUp.answer;
        hideStatus();
        persist();
        renderFollowUp(q);
    }

    function assignBranchIfNeeded() {
        if (state.session.mode !== "adaptive" || state.session.assignedBranch) return;
        if (!diagnosticIds.every(id => state.session.submitted[id])) return;

        let score = 0;
        diagnosticIds.forEach(id => {
            if (mainCorrect(id)) score++;
        });

        const branch = score === 2 ? "advanced" : score === 1 ? "intermediate" : "foundation";
        state.session.assignedBranch = branch;

        branchIds[branch].forEach(id => {
            if (!state.session.questionIds.includes(id)) {
                state.session.questionIds.push(id);
                state.session.answers[id] = null;
                state.session.submitted[id] = false;
                state.session.followUp[id] = { selected: null, submitted: false, correct: null };
            }
        });

        const key = branch === "foundation" ? "adaptiveAssignedFoundation" : branch === "intermediate" ? "adaptiveAssignedIntermediate" : "adaptiveAssignedAdvanced";
        showStatus(t(key), "info");
    }

    function nextQuestion() {
        const id = currentId();
        if (!state.session.submitted[id]) {
            showStatus(t("statusSubmitBeforeNext"), "error");
            return;
        }

        if (needsFollowUp(id) && !state.session.followUp[id].submitted) {
            showStatus(t("statusSelectFollowUp"), "error");
            return;
        }

        assignBranchIfNeeded();

        if (state.session.currentIndex === state.session.questionIds.length - 1) {
            finish();
            return;
        }

        state.session.currentIndex++;
        hideStatus();
        persist();
        renderQuiz();
    }

    function previousQuestion() {
        if (state.session.currentIndex === 0) return;
        state.session.currentIndex--;
        hideStatus();
        persist();
        renderQuiz();
    }

    function score() {
        return state.session.questionIds.filter(id => state.session.submitted[id] && mainCorrect(id)).length;
    }

    function profile() {
        const result = {
            basics: { correct: 0, total: 0 },
            visual: { correct: 0, total: 0 },
            methods: { correct: 0, total: 0 },
            advanced: { correct: 0, total: 0 }
        };

        state.session.questionIds.forEach(id => {
            const q = questionMap[id];
            result[q.category].total++;
            if (mainCorrect(id)) result[q.category].correct++;
        });

        return result;
    }

    function profileStatus(percent) {
        if (percent >= 80) return t("profileStrong");
        if (percent >= 50) return t("profileDeveloping");
        return t("profileNeedsWork");
    }

    function learnerTag(profileData, overallPercent) {
        if (overallPercent >= 85) return t("learnerBalanced");

        let strongest = "basics";
        let best = -1;
        Object.keys(profileData).forEach(key => {
            const item = profileData[key];
            const ratio = item.total ? item.correct / item.total : 0;
            if (ratio > best) {
                best = ratio;
                strongest = key;
            }
        });

        if (strongest === "visual") return t("learnerVisual");
        if (strongest === "methods") return t("learnerMethods");
        if (strongest === "advanced") return t("learnerAdvanced");
        return t("learnerFoundation");
    }

    function renderRouteSummary(total, finalScore, percentage) {
        const mode = state.session.mode === "retry" ? t("routeRetry") : "Adaptive";
        const route = t(routeKey());
        const items = [
            { label: t("modeLabel"), value: mode },
            { label: t("routeLabel"), value: route },
            { label: t("accuracyLabel"), value: `${percentage}%` },
            { label: t("questionCountLabel"), value: String(total) }
        ];

        el.routeSummaryGrid.innerHTML = items.map(item => `
            <div class="summary-item">
                <h4>${item.label}</h4>
                <p>${item.value}</p>
            </div>
        `).join("");
    }

    function renderProfile(profileData) {
        const config = [
            { key: "basics", label: t("categoryBasics") },
            { key: "visual", label: t("categoryVisual") },
            { key: "methods", label: t("categoryMethods") },
            { key: "advanced", label: t("categoryAdvanced") }
        ];

        el.profileGrid.innerHTML = config.map(item => {
            const data = profileData[item.key];
            const percent = data.total ? Math.round((data.correct / data.total) * 100) : 0;
            return `
                <div class="profile-item">
                    <h4>${item.label}</h4>
                    <div class="profile-meta">
                        <span>${data.correct} / ${data.total}</span>
                        <span>${profileStatus(percent)}</span>
                    </div>
                    <div class="mini-progress">
                        <div class="mini-progress-bar" style="width:${percent}%"></div>
                    </div>
                </div>
            `;
        }).join("");
    }

    function weakestCategory(profileData) {
        return Object.keys(profileData)
            .map(key => {
                const item = profileData[key];
                return { key, percent: item.total ? Math.round((item.correct / item.total) * 100) : 0 };
            })
            .sort((a, b) => a.percent - b.percent)[0].key;
    }

    function renderSuggestions(profileData, overallPercent) {
        const suggestions = [];
        const weakest = weakestCategory(profileData);

        if (weakest === "basics") suggestions.push(t("suggestionBasics"));
        if (weakest === "visual") suggestions.push(t("suggestionVisual"));
        if (weakest === "methods") suggestions.push(t("suggestionMethods"));
        if (weakest === "advanced") suggestions.push(t("suggestionAdvancedArea"));

        if (state.session.mode === "retry") {
            suggestions.push(t("suggestionRetry"));
        } else if (state.session.assignedBranch === "foundation") {
            suggestions.push(t("suggestionFoundation"));
        } else if (state.session.assignedBranch === "intermediate") {
            suggestions.push(t("suggestionIntermediate"));
        } else if (state.session.assignedBranch === "advanced") {
            suggestions.push(t("suggestionAdvancedPath"));
        }

        if (overallPercent >= 80) suggestions.push(t("suggestionHighScore"));

        el.suggestionsList.innerHTML = suggestions.map(text => `<li>${text}</li>`).join("");
    }

    function wrongIds() {
        return state.session.questionIds.filter(id => !mainCorrect(id));
    }

    function renderWrongAnswers() {
        const wrong = wrongIds();

        if (!wrong.length) {
            el.wrongAnswersList.innerHTML = `<p>${t("noWrongAnswers")}</p>`;
            return;
        }

        el.wrongAnswersList.innerHTML = wrong.map((id, index) => {
            const q = questionMap[id];
            const answerIndex = state.session.answers[id];
            const userAnswer = answerIndex === null ? t("noAnswer") : q.options[answerIndex][state.currentLang];
            const correctAnswer = q.options[q.answer][state.currentLang];

            return `
                <div class="review-item">
                    <h4>${state.currentLang === "en" ? `Question ${index + 1}` : `第 ${index + 1} 题`}</h4>
                    <p><strong>${q.title[state.currentLang]}</strong></p>
                    <p>${q.prompt[state.currentLang]}</p>
                    <p>${t("yourAnswer")} ${userAnswer}</p>
                    <p>${t("correctAnswer")} ${correctAnswer}</p>
                    <p>${q.explanation[state.currentLang]}</p>
                </div>
            `;
        }).join("");
    }

    function finish() {
        state.session.stage = "result";
        showScreen("result");
        renderResult();
        clearSnapshot();
    }

    function renderResult() {
        const total = state.session.questionIds.length;
        const finalScore = score();
        const percentage = Math.round((finalScore / total) * 100);
        const profileData = profile();

        el.resultRouteBadge.textContent = t(routeKey());
        el.learnerTag.textContent = learnerTag(profileData, percentage);
        el.resultTitle.textContent = t("resultTitle");
        el.resultSubtitle.textContent = t("resultSubtitle");
        el.scoreText.textContent = `${finalScore} / ${total}`;
        el.percentageText.textContent = `${t("percentagePrefix")} ${percentage}%`;

        if (percentage >= 80) el.performanceText.textContent = t("scoreSummaryHigh");
        else if (percentage >= 50) el.performanceText.textContent = t("scoreSummaryMid");
        else el.performanceText.textContent = t("scoreSummaryLow");

        renderRouteSummary(total, finalScore, percentage);
        renderProfile(profileData);
        renderSuggestions(profileData, percentage);
        renderWrongAnswers();

        el.retryWrongBtn.style.display = wrongIds().length ? "inline-flex" : "none";
    }

    function restartFull() {
        if (!window.confirm(t("restartConfirm"))) return;
        startAdaptive();
    }

    function retryWrong() {
        const wrong = wrongIds();
        if (!wrong.length) return;
        state.session = newSession("retry", wrong);
        state.session.assignedBranch = "retry";
        showScreen("quiz");
        renderQuiz();
        persist();
    }

    function startAdaptive() {
        state.session = newSession("adaptive", diagnosticIds);
        showScreen("quiz");
        renderQuiz();
        persist();
    }

    function persist() {
        if (state.session && state.session.stage === "quiz") {
            saveSnapshot({
                currentLang: state.currentLang,
                fontSize: state.fontSize,
                session: state.session
            });
        }
    }

    function validSnapshot(snapshot) {
        if (!snapshot || !snapshot.session || !Array.isArray(snapshot.session.questionIds)) return false;
        return snapshot.session.questionIds.every(id => !!questionMap[id]);
    }

    function showResumeIfAvailable(updateText = true) {
        const snapshot = loadSnapshot();

        if (validSnapshot(snapshot) && snapshot.session.stage === "quiz") {
            state.savedSnapshot = snapshot;
            el.resumeBox.classList.remove("hidden");
            if (updateText) {
                el.resumeText.textContent = t("resumeText");
                el.resumeQuizBtn.textContent = t("resumeQuiz");
                el.clearProgressBtn.textContent = t("clearProgress");
            }
        } else {
            state.savedSnapshot = null;
            el.resumeBox.classList.add("hidden");
        }
    }

    function resumeSession() {
        if (!state.savedSnapshot) return;
        state.currentLang = state.savedSnapshot.currentLang || "en";
        state.fontSize = Number(state.savedSnapshot.fontSize) || 16;
        state.session = state.savedSnapshot.session;
        setFontSize(state.fontSize);
        setLanguage(state.currentLang);
        showScreen("quiz");
        renderQuiz();
    }

    function clearSavedProgress() {
        clearSnapshot();
        state.savedSnapshot = null;
        el.resumeBox.classList.add("hidden");
        alert(t("progressCleared"));
    }

    function hasUnfinishedProgress() {
        if (!state.session || state.session.stage !== "quiz") return false;
        return state.session.questionIds.some(id => state.session.answers[id] !== null || state.session.submitted[id]);
    }

    function bindEvents() {
        el.langButtons.forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
        el.fontButtons.forEach(btn => btn.addEventListener("click", () => setFontSize(btn.dataset.font)));

        el.startQuizBtn.addEventListener("click", startAdaptive);
        el.resumeQuizBtn.addEventListener("click", resumeSession);
        el.clearProgressBtn.addEventListener("click", clearSavedProgress);
        el.submitBtn.addEventListener("click", submitMainAnswer);
        el.submitFollowUpBtn.addEventListener("click", submitFollowUp);
        el.prevBtn.addEventListener("click", previousQuestion);
        el.nextBtn.addEventListener("click", nextQuestion);
        el.retryWrongBtn.addEventListener("click", retryWrong);
        el.restartAssessmentBtn.addEventListener("click", restartFull);

        window.addEventListener("beforeunload", event => {
            if (hasUnfinishedProgress()) {
                event.preventDefault();
                event.returnValue = t("leaveConfirm");
            }
        });
    }

    function init() {
        bindEvents();
        setFontSize(16);
        setLanguage("en");
        showScreen("intro");
        showResumeIfAvailable();
    }

    init();
})();
