(function () {
    const STORAGE_KEY = "ebu6305_test_v3_only";

    function sharpSceneSVG() {
        return `
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <rect width="320" height="180" fill="#dbeafe"/>
            <rect y="110" width="320" height="70" fill="#86efac"/>
            <circle cx="55" cy="45" r="22" fill="#fde68a"/>
            <rect x="120" y="70" width="70" height="65" fill="#60a5fa"/>
            <polygon points="120,70 155,42 190,70" fill="#1d4ed8"/>
            <rect x="210" y="55" width="38" height="80" fill="#ef4444"/>
            <rect x="216" y="65" width="10" height="12" fill="#fee2e2"/>
            <rect x="232" y="65" width="10" height="12" fill="#fee2e2"/>
            <path d="M0 115 Q55 90 110 115 T220 115 T320 115" fill="none" stroke="#16a34a" stroke-width="5"/>
        </svg>`;
    }

    function blockySceneSVG() {
        return `
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
        </svg>`;
    }

    function stripedPatternSVG() {
        return `
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <rect width="320" height="180" fill="#f8fafc"/>
            <rect x="0" width="20" height="180" fill="#111827"/>
            <rect x="20" width="20" height="180" fill="#f9fafb"/>
            <rect x="40" width="20" height="180" fill="#111827"/>
            <rect x="60" width="20" height="180" fill="#f9fafb"/>
            <rect x="80" width="20" height="180" fill="#111827"/>
            <rect x="100" width="20" height="180" fill="#f9fafb"/>
            <rect x="120" width="20" height="180" fill="#111827"/>
            <rect x="140" width="20" height="180" fill="#f9fafb"/>
            <rect x="160" width="20" height="180" fill="#111827"/>
            <rect x="180" width="20" height="180" fill="#f9fafb"/>
            <rect x="200" width="20" height="180" fill="#111827"/>
            <rect x="220" width="20" height="180" fill="#f9fafb"/>
            <rect x="240" width="20" height="180" fill="#111827"/>
            <rect x="260" width="20" height="180" fill="#f9fafb"/>
            <rect x="280" width="20" height="180" fill="#111827"/>
            <rect x="300" width="20" height="180" fill="#f9fafb"/>
        </svg>`;
    }

    function noisyPhotoSVG() {
        return `
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0" x2="1">
                    <stop offset="0%" stop-color="#60a5fa"/>
                    <stop offset="100%" stop-color="#fca5a5"/>
                </linearGradient>
            </defs>
            <rect width="320" height="180" fill="url(#grad1)"/>
            <circle cx="50" cy="35" r="18" fill="#fde68a"/>
            <g opacity="0.55">
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
        </svg>`;
    }

    function ringingSVG() {
        return `
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <rect width="320" height="180" fill="#f8fafc"/>
            <rect x="90" y="40" width="140" height="100" fill="#111827"/>
            <rect x="84" y="34" width="152" height="112" fill="none" stroke="#9ca3af" stroke-width="4"/>
            <rect x="78" y="28" width="164" height="124" fill="none" stroke="#d1d5db" stroke-width="3"/>
            <rect x="72" y="22" width="176" height="136" fill="none" stroke="#e5e7eb" stroke-width="2"/>
        </svg>`;
    }

    function cleanEdgeSVG() {
        return `
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <rect width="320" height="180" fill="#f8fafc"/>
            <rect x="90" y="40" width="140" height="100" fill="#111827"/>
        </svg>`;
    }

    function gradientSmoothSVG() {
        return `
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="smoothGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#1d4ed8"/>
                    <stop offset="100%" stop-color="#93c5fd"/>
                </linearGradient>
            </defs>
            <rect width="320" height="180" fill="url(#smoothGrad)"/>
        </svg>`;
    }

    function bandingSVG() {
        return `
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="180" x="0" fill="#1e3a8a"/>
            <rect width="40" height="180" x="40" fill="#1d4ed8"/>
            <rect width="40" height="180" x="80" fill="#2563eb"/>
            <rect width="40" height="180" x="120" fill="#3b82f6"/>
            <rect width="40" height="180" x="160" fill="#60a5fa"/>
            <rect width="40" height="180" x="200" fill="#7dd3fc"/>
            <rect width="40" height="180" x="240" fill="#93c5fd"/>
            <rect width="40" height="180" x="280" fill="#bfdbfe"/>
        </svg>`;
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

            breadcrumb: '<a href="homepage.html">Home</a> &gt; <a href="test.html">Tests</a> &gt; Smart Compression Assessment',

            languageLabel: "Language",
            fontSizeLabel: "Font Size",

            heroBadge: "Adaptive + Visual + Diagnostic",
            introTitle: "Smart Compression Assessment",
            introDescription: "This test uses adaptive routing, visual judgement questions, micro follow-up tasks, and personalised feedback to evaluate your understanding of image compression.",

            infoTitle1: "Adaptive Path",
            infoText1: "The route changes after diagnostic questions and sends you to the most suitable difficulty path.",
            infoTitle2: "Visual Judgement",
            infoText2: "You will compare compression examples and identify visible artifacts, not just answer text questions.",
            infoTitle3: "Follow-up Tasks",
            infoText3: "If you answer incorrectly, you get a short corrective mini-question to reinforce the concept.",
            infoTitle4: "Capability Profile",
            infoText4: "Your result page shows strengths, weak points, and recommended review directions.",

            resumeText: "You have an unfinished assessment session.",
            resumeQuiz: "Continue Previous Session",

            startAssessment: "Start Smart Assessment",
            goLearning: "Go to Learning Page",

            progressLabel: "Progress",
            submitAnswer: "Submit Answer",
            previousQuestion: "Previous Question",
            nextQuestion: "Next Question",
            finishAssessment: "Finish Assessment",

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
            routeFoundationDesc: "You are currently on the foundation route focused on core understanding.",
            routeIntermediate: "Intermediate Path",
            routeIntermediateDesc: "You are currently on the intermediate route with method comparison and visual recognition.",
            routeAdvanced: "Advanced Path",
            routeAdvancedDesc: "You are currently on the advanced route with deeper compression reasoning.",
            routeRetry: "Retry Mode",
            routeRetryDesc: "You are retrying only the questions you missed previously.",

            difficultyDiagnostic: "Diagnostic",
            difficultyFoundation: "Foundation",
            difficultyIntermediate: "Intermediate",
            difficultyAdvanced: "Advanced",
            difficultyRetry: "Retry",

            questionLabel: "Question",
            ofLabel: "of",

            resultTitle: "Assessment Completed",
            resultSubtitle: "You have completed the smart compression assessment.",
            retryWrong: "Retry Wrong Questions Only",
            restartFull: "Restart Full Assessment",
            reviewLearning: "Review Learning Page",
            profileTitle: "Capability Profile",
            suggestionsTitle: "Recommended Next Steps",
            reviewTitle: "Review Incorrect Answers",

            noWrongAnswers: "Excellent. You answered every main question correctly.",
            percentagePrefix: "Your score is",
            learnerFoundation: "Concept Builder",
            learnerVisual: "Artifact Detective",
            learnerMethods: "Compression Strategist",
            learnerAdvanced: "Frequency Explorer",
            learnerBalanced: "Compression Explorer",

            categoryBasics: "Basic Concepts",
            categoryVisual: "Visual Recognition",
            categoryMethods: "Compression Methods",
            categoryAdvanced: "Advanced Reasoning",

            profileStrong: "Strong",
            profileDeveloping: "Developing",
            profileNeedsWork: "Needs Work",

            suggestionBasics: "Review the core ideas of compression, redundancy, and lossy vs lossless techniques.",
            suggestionVisual: "Spend more time comparing compressed images and identifying visible artifacts such as blockiness or banding.",
            suggestionMethods: "Review how JPEG, RLE, and other methods reduce data more efficiently.",
            suggestionAdvanced: "Revisit DCT and the trade-off between visual quality and file size.",
            suggestionFoundation: "Because you were routed to the foundation path, revisit the Learning page before attempting more advanced tasks.",
            suggestionIntermediate: "You are ready to strengthen method comparison and visual judgement with a second attempt.",
            suggestionAdvanced: "You handled the advanced path. Try to improve your precision on subtle compression artifacts.",
            suggestionRetry: "Retry the missed questions and compare your new answers with the explanations.",
            suggestionHighScore: "Great performance. Try to explain each answer in your own words to reinforce your understanding.",

            scoreSummaryHigh: "Great job. Your answers show a strong understanding of image compression concepts and visual judgment.",
            scoreSummaryMid: "Good progress. You understand many key ideas, but there are still some weak points to review.",
            scoreSummaryLow: "You should review the Learning page and revisit the core compression concepts before retrying.",

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

            heroBadge: "自适应 + 视觉判断 + 诊断评测",
            introTitle: "智能压缩评测",
            introDescription: "这套测试会结合自适应路径、视觉判断题、答错追问题和个性化反馈，评估你对图像压缩的理解程度。",

            infoTitle1: "自适应路径",
            infoText1: "系统会根据诊断题表现，把你分配到更适合你的难度路径。",
            infoTitle2: "视觉判断题",
            infoText2: "你不仅要回答文字题，还要比较压缩效果并识别可见伪影。",
            infoTitle3: "追问题机制",
            infoText3: "答错后会出现一个更短的小追问，帮助你立即纠正理解。",
            infoTitle4: "能力画像",
            infoText4: "结果页会显示你的优势、薄弱点和下一步复习建议。",

            resumeText: "你有一个未完成的评测进度。",
            resumeQuiz: "继续上次评测",

            startAssessment: "开始智能评测",
            goLearning: "前往学习页面",

            progressLabel: "进度",
            submitAnswer: "提交答案",
            previousQuestion: "上一题",
            nextQuestion: "下一题",
            finishAssessment: "完成评测",

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
            routeFoundationDesc: "你当前处于基础路径，重点考察核心概念理解。",
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

            resultTitle: "评测完成",
            resultSubtitle: "你已经完成了本次智能压缩评测。",
            retryWrong: "只重做错题",
            restartFull: "重新开始完整评测",
            reviewLearning: "回顾学习页面",
            profileTitle: "能力画像",
            suggestionsTitle: "下一步建议",
            reviewTitle: "错题回顾",

            noWrongAnswers: "太棒了，你所有主问题都答对了。",
            percentagePrefix: "你的得分是",
            learnerFoundation: "概念搭建者",
            learnerVisual: "伪影侦探",
            learnerMethods: "压缩策略家",
            learnerAdvanced: "频域探索者",
            learnerBalanced: "压缩探索者",

            categoryBasics: "基础概念",
            categoryVisual: "视觉识别",
            categoryMethods: "压缩方法",
            categoryAdvanced: "高级推理",

            profileStrong: "优势",
            profileDeveloping: "发展中",
            profileNeedsWork: "待加强",

            suggestionBasics: "建议复习压缩、冗余、有损与无损等核心概念。",
            suggestionVisual: "建议多比较压缩图像，识别方块感、色带等可见伪影。",
            suggestionMethods: "建议回顾 JPEG、RLE 等压缩方法是如何减少数据的。",
            suggestionAdvanced: "建议重新理解 DCT 以及画质与文件大小之间的权衡。",
            suggestionFoundation: "由于你被分配到基础路径，建议先回到 Learning 页面巩固核心内容。",
            suggestionIntermediate: "你已经具备一定基础，下一步建议加强方法比较和视觉判断能力。",
            suggestionAdvanced: "你完成了高级路径，可以继续提升对细微压缩伪影的判断精度。",
            suggestionRetry: "建议重做错题，并将新的答案与解释进行对照。",
            suggestionHighScore: "本次表现很好，建议尝试用自己的话解释每一道题，加深理解。",

            scoreSummaryHigh: "表现很好。你的答案显示你对图像压缩概念和视觉判断都有较强理解。",
            scoreSummaryMid: "进步不错。你已经掌握了不少关键概念，但还有部分薄弱点需要复习。",
            scoreSummaryLow: "建议先回到 Learning 页面复习核心压缩概念，再重新尝试。",

            yourAnswer: "你的答案：",
            correctAnswer: "正确答案：",
            noAnswer: "未作答",

            adaptiveAssignedFoundation: "诊断阶段将你分配到了基础路径。",
            adaptiveAssignedIntermediate: "诊断阶段将你分配到了进阶路径。",
            adaptiveAssignedAdvanced: "诊断阶段将你分配到了高级路径。"
        }
    };

    const questionBank = [
        {
            id: "diag-1",
            phase: "diagnostic",
            type: "mcq",
            category: "basics",
            title: {
                en: "Compression goal",
                zh: "压缩目标"
            },
            prompt: {
                en: "What is the main goal of data compression?",
                zh: "数据压缩的主要目标是什么？"
            },
            options: [
                { en: "To make images more colourful", zh: "让图像颜色更丰富" },
                { en: "To reduce file size while keeping useful information", zh: "在保留有用信息的前提下减小文件体积" },
                { en: "To add more pixels to a file", zh: "给文件增加更多像素" },
                { en: "To remove all visual details", zh: "移除所有视觉细节" }
            ],
            answer: 1,
            explanation: {
                en: "Compression reduces the amount of data needed for storage or transmission while trying to preserve useful information.",
                zh: "压缩的目标是在尽量保留有用信息的同时，减少存储或传输所需的数据量。"
            },
            followUp: {
                prompt: {
                    en: "Which statement best matches efficient compression?",
                    zh: "哪句话最符合“高效压缩”？"
                },
                options: [
                    { en: "Smaller files with acceptable quality", zh: "文件更小，同时质量仍可接受" },
                    { en: "Larger files with no change", zh: "文件更大且没有变化" },
                    { en: "More noise in every image", zh: "所有图像都增加噪点" }
                ],
                answer: 0,
                explanation: {
                    en: "Efficient compression balances file size reduction with useful retained quality.",
                    zh: "高效压缩的关键是兼顾文件体积减小和可接受的保留质量。"
                }
            }
        },
        {
            id: "diag-2",
            phase: "diagnostic",
            type: "visual",
            category: "visual",
            title: {
                en: "Visual artifact spotting",
                zh: "视觉伪影识别"
            },
            prompt: {
                en: "Which sample shows stronger blocky compression artifacts?",
                zh: "哪一个样本显示出了更明显的方块压缩伪影？"
            },
            visuals: [
                {
                    title: { en: "Sample A", zh: "样本 A" },
                    caption: { en: "Sharper edges and smoother transitions", zh: "边缘更清晰，过渡更平滑" },
                    svg: sharpSceneSVG()
                },
                {
                    title: { en: "Sample B", zh: "样本 B" },
                    caption: { en: "Visible large colour blocks", zh: "能看到明显的大色块" },
                    svg: blockySceneSVG()
                }
            ],
            options: [
                { en: "Sample A", zh: "样本 A" },
                { en: "Sample B", zh: "样本 B" },
                { en: "Both are identical", zh: "两者完全一样" },
                { en: "Neither shows artifacts", zh: "两者都没有伪影" }
            ],
            answer: 1,
            explanation: {
                en: "Sample B shows blockiness, which is a typical artifact when compression is too strong.",
                zh: "样本 B 出现了明显方块感，这是压缩过强时常见的伪影。"
            },
            followUp: {
                prompt: {
                    en: "Which artifact usually looks like visible squares or blocks?",
                    zh: "哪一种伪影通常表现为可见的小方块或大色块？"
                },
                options: [
                    { en: "Blockiness", zh: "方块效应" },
                    { en: "Sharpness gain", zh: "锐化增强" },
                    { en: "Perfect reconstruction", zh: "完美重建" }
                ],
                answer: 0,
                explanation: {
                    en: "Blockiness is one of the clearest signs of heavy image compression.",
                    zh: "方块效应是图像压缩过强时最典型的视觉特征之一。"
                }
            }
        },

        {
            id: "foundation-1",
            phase: "foundation",
            type: "mcq",
            category: "basics",
            title: { en: "Lossless compression", zh: "无损压缩" },
            prompt: {
                en: "Which type of compression keeps all original data?",
                zh: "哪一种压缩方式会保留全部原始数据？"
            },
            options: [
                { en: "Lossy compression", zh: "有损压缩" },
                { en: "Lossless compression", zh: "无损压缩" },
                { en: "Visual-only compression", zh: "仅视觉压缩" },
                { en: "Random compression", zh: "随机压缩" }
            ],
            answer: 1,
            explanation: {
                en: "Lossless compression allows the original data to be reconstructed exactly.",
                zh: "无损压缩可以完整恢复原始数据。"
            },
            followUp: {
                prompt: {
                    en: "When exact recovery is required, which type is usually safer?",
                    zh: "当必须精确恢复原始数据时，哪种压缩更安全？"
                },
                options: [
                    { en: "Lossless", zh: "无损压缩" },
                    { en: "Lossy", zh: "有损压缩" },
                    { en: "Either one", zh: "两者都一样" }
                ],
                answer: 0,
                explanation: {
                    en: "Use lossless compression when the original content must be preserved exactly.",
                    zh: "当必须保持原始内容完全一致时，应优先选择无损压缩。"
                }
            }
        },
        {
            id: "foundation-2",
            phase: "foundation",
            type: "visual",
            category: "visual",
            title: { en: "RLE suitability", zh: "RLE 适用场景" },
            prompt: {
                en: "Which image is more suitable for Run-Length Encoding (RLE)?",
                zh: "哪种图像更适合使用行程编码（RLE）？"
            },
            visuals: [
                {
                    title: { en: "Image A", zh: "图像 A" },
                    caption: { en: "Repeated high-contrast stripes", zh: "重复出现的高对比条纹" },
                    svg: stripedPatternSVG()
                },
                {
                    title: { en: "Image B", zh: "图像 B" },
                    caption: { en: "Many small irregular details", zh: "包含很多细小且不规则的细节" },
                    svg: noisyPhotoSVG()
                }
            ],
            options: [
                { en: "Image A", zh: "图像 A" },
                { en: "Image B", zh: "图像 B" },
                { en: "Both are equally suitable", zh: "两者同样适合" },
                { en: "Neither can be compressed", zh: "两者都不能压缩" }
            ],
            answer: 0,
            explanation: {
                en: "RLE works best when the same values repeat many times in a row, such as regular stripes or large flat regions.",
                zh: "RLE 最适合连续重复值较多的图像，例如规则条纹或大面积纯色区域。"
            },
            followUp: {
                prompt: {
                    en: "Why does RLE work better on Image A?",
                    zh: "为什么 RLE 更适合图像 A？"
                },
                options: [
                    { en: "Because the pixels repeat in long runs", zh: "因为像素值会连续重复较长长度" },
                    { en: "Because it contains more noise", zh: "因为它包含更多噪点" },
                    { en: "Because it has more random changes", zh: "因为它变化更随机" }
                ],
                answer: 0,
                explanation: {
                    en: "Run-Length Encoding stores repeated values more efficiently, so repeated patterns are ideal.",
                    zh: "行程编码会更高效地存储重复值，因此重复模式非常适合它。"
                }
            }
        },
        {
            id: "foundation-3",
            phase: "foundation",
            type: "mcq",
            category: "basics",
            title: { en: "Transmission benefit", zh: "传输优势" },
            prompt: {
                en: "Why does compression help online transmission?",
                zh: "为什么压缩有利于在线传输？"
            },
            options: [
                { en: "Smaller files usually require less bandwidth", zh: "更小的文件通常需要更少带宽" },
                { en: "Compression increases the screen size", zh: "压缩会增大屏幕尺寸" },
                { en: "Compression removes every colour", zh: "压缩会移除所有颜色" },
                { en: "Compression changes the internet provider", zh: "压缩会改变网络服务商" }
            ],
            answer: 0,
            explanation: {
                en: "When the file is smaller, less data needs to be transmitted, so sending and loading can be faster.",
                zh: "文件更小时，需要传输的数据更少，因此上传和加载通常会更快。"
            },
            followUp: {
                prompt: {
                    en: "Which phrase best describes bandwidth efficiency?",
                    zh: "哪句话最能体现带宽效率？"
                },
                options: [
                    { en: "Less data for the same task", zh: "完成同样任务传输更少数据" },
                    { en: "More data for the same file", zh: "同一文件传输更多数据" },
                    { en: "Random file growth", zh: "文件随机变大" }
                ],
                answer: 0,
                explanation: {
                    en: "Bandwidth efficiency means transmitting the needed content with less data.",
                    zh: "带宽效率意味着用更少的数据完成所需内容的传输。"
                }
            }
        },
        {
            id: "foundation-4",
            phase: "foundation",
            type: "mcq",
            category: "methods",
            title: { en: "Redundancy", zh: "冗余" },
            prompt: {
                en: "What does redundancy mean in data compression?",
                zh: "在数据压缩中，冗余是什么意思？"
            },
            options: [
                { en: "Repeated or predictable information", zh: "重复出现或可预测的信息" },
                { en: "Encrypted private data", zh: "被加密的私密数据" },
                { en: "Only audio information", zh: "只有音频信息" },
                { en: "Data printed on paper", zh: "打印在纸上的数据" }
            ],
            answer: 0,
            explanation: {
                en: "Compression often works by identifying repeated or predictable patterns and representing them more efficiently.",
                zh: "压缩通常通过发现重复或可预测的模式，并用更高效的方式表示它们。"
            },
            followUp: {
                prompt: {
                    en: "Removing redundancy usually helps because it reduces what kind of data?",
                    zh: "消除冗余之所以有帮助，通常是因为它减少了哪类数据？"
                },
                options: [
                    { en: "Repeated information", zh: "重复信息" },
                    { en: "All useful content", zh: "全部有用内容" },
                    { en: "Only the file name", zh: "只有文件名" }
                ],
                answer: 0,
                explanation: {
                    en: "Compression targets repeated or unnecessary data patterns, not all useful content.",
                    zh: "压缩针对的是重复或不必要的数据模式，而不是所有有用内容。"
                }
            }
        },

        {
            id: "intermediate-1",
            phase: "intermediate",
            type: "mcq",
            category: "methods",
            title: { en: "JPEG reasoning", zh: "JPEG 原理判断" },
            prompt: {
                en: "Why is JPEG considered a lossy format?",
                zh: "为什么 JPEG 被认为是有损格式？"
            },
            options: [
                { en: "Because it deletes some image information to reduce file size", zh: "因为它会删除部分图像信息来减小文件体积" },
                { en: "Because it always increases file size", zh: "因为它总会增大文件体积" },
                { en: "Because it only stores text", zh: "因为它只能存储文字" },
                { en: "Because it has no compression algorithm", zh: "因为它没有压缩算法" }
            ],
            answer: 0,
            explanation: {
                en: "JPEG reduces file size by discarding some information that is considered less important to human vision.",
                zh: "JPEG 通过舍弃部分对人眼不太重要的信息来减小文件体积。"
            },
            followUp: {
                prompt: {
                    en: "What is the trade-off in lossy compression?",
                    zh: "有损压缩的核心权衡是什么？"
                },
                options: [
                    { en: "Smaller size versus some quality loss", zh: "更小体积与一定质量损失之间的权衡" },
                    { en: "More storage versus more noise", zh: "更多存储与更多噪点之间的权衡" },
                    { en: "Slower speed versus higher bandwidth", zh: "更慢速度与更高带宽之间的权衡" }
                ],
                answer: 0,
                explanation: {
                    en: "Lossy compression usually trades some quality for a smaller file size.",
                    zh: "有损压缩通常是用一部分质量来换取更小的文件体积。"
                }
            }
        },
        {
            id: "intermediate-2",
            phase: "intermediate",
            type: "visual",
            category: "visual",
            title: { en: "Ringing artifact", zh: "振铃伪影" },
            prompt: {
                en: "Which sample more clearly shows ringing around strong edges?",
                zh: "哪一个样本更明显地显示了强边缘附近的振铃现象？"
            },
            visuals: [
                {
                    title: { en: "Sample A", zh: "样本 A" },
                    caption: { en: "Edge with halo-like outlines", zh: "边缘周围有类似光晕的轮廓" },
                    svg: ringingSVG()
                },
                {
                    title: { en: "Sample B", zh: "样本 B" },
                    caption: { en: "Single clean edge", zh: "单一且干净的边缘" },
                    svg: cleanEdgeSVG()
                }
            ],
            options: [
                { en: "Sample A", zh: "样本 A" },
                { en: "Sample B", zh: "样本 B" },
                { en: "Both are clean", zh: "两者都很干净" },
                { en: "Neither contains edges", zh: "两者都没有边缘" }
            ],
            answer: 0,
            explanation: {
                en: "Sample A shows extra halo-like contours near the edge, which is typical of ringing artifacts.",
                zh: "样本 A 在边缘周围有额外的光晕状轮廓，这是振铃伪影的典型表现。"
            },
            followUp: {
                prompt: {
                    en: "Ringing artifacts usually appear near what kind of image regions?",
                    zh: "振铃伪影通常出现在什么类型的图像区域附近？"
                },
                options: [
                    { en: "Strong edges and transitions", zh: "强边缘和突变区域" },
                    { en: "Perfectly uniform blank space", zh: "完全均匀的空白区域" },
                    { en: "The file name bar", zh: "文件名区域" }
                ],
                answer: 0,
                explanation: {
                    en: "Ringing is often easiest to spot near sharp edges and sudden transitions.",
                    zh: "振铃最容易在清晰边缘和突然过渡的位置附近出现。"
                }
            }
        },
        {
            id: "intermediate-3",
            phase: "intermediate",
            type: "mcq",
            category: "methods",
            title: { en: "Redundancy handling", zh: "冗余处理" },
            prompt: {
                en: "Which statement best explains how compression uses redundancy?",
                zh: "哪句话最能解释压缩如何利用冗余？"
            },
            options: [
                { en: "It stores repeated patterns more efficiently", zh: "它会更高效地存储重复模式" },
                { en: "It adds more repeated patterns to the file", zh: "它会向文件中加入更多重复模式" },
                { en: "It ignores every repeated value", zh: "它会忽略所有重复值" },
                { en: "It deletes the file structure first", zh: "它会先删除文件结构" }
            ],
            answer: 0,
            explanation: {
                en: "Repeated or predictable patterns can often be represented with fewer bits than storing them directly every time.",
                zh: "重复或可预测的模式通常可以用更少的比特来表示，而不是每次都完整存储。"
            },
            followUp: {
                prompt: {
                    en: "Why is repetition useful to a compression algorithm?",
                    zh: "为什么重复模式对压缩算法有帮助？"
                },
                options: [
                    { en: "Because the same information can be encoded more compactly", zh: "因为相同信息可以被更紧凑地编码" },
                    { en: "Because it makes the file random", zh: "因为它会让文件变得随机" },
                    { en: "Because it removes all data instantly", zh: "因为它会立刻删除所有数据" }
                ],
                answer: 0,
                explanation: {
                    en: "Repetition gives the algorithm a chance to encode patterns more efficiently than raw storage.",
                    zh: "重复模式让算法有机会用比原始存储更高效的方式进行编码。"
                }
            }
        },
        {
            id: "intermediate-4",
            phase: "intermediate",
            type: "mcq",
            category: "advanced",
            title: { en: "Quality trade-off", zh: "质量权衡" },
            prompt: {
                en: "A webpage needs images that load quickly but still look acceptable. Which option is usually the most realistic compromise?",
                zh: "某网页需要图片加载快，同时画质仍保持可接受。通常哪种做法最现实？"
            },
            options: [
                { en: "Use a moderate compression level instead of no compression", zh: "使用适中的压缩，而不是完全不压缩" },
                { en: "Always keep the file uncompressed", zh: "始终保持文件不压缩" },
                { en: "Remove all image details", zh: "移除所有图像细节" },
                { en: "Store every image as a huge bitmap", zh: "把所有图像都存成巨大的位图" }
            ],
            answer: 0,
            explanation: {
                en: "Practical media design often balances acceptable visual quality against smaller file size and faster loading.",
                zh: "真实媒体设计通常是在可接受画质和更小文件体积、更快加载之间取得平衡。"
            },
            followUp: {
                prompt: {
                    en: "What does a good compression decision usually balance?",
                    zh: "好的压缩决策通常平衡哪两件事？"
                },
                options: [
                    { en: "Quality and size", zh: "质量与体积" },
                    { en: "Colour and electricity", zh: "颜色与电力" },
                    { en: "Brightness and keyboard layout", zh: "亮度与键盘布局" }
                ],
                answer: 0,
                explanation: {
                    en: "Compression decisions often focus on the trade-off between file size and perceived quality.",
                    zh: "压缩决策通常围绕文件体积与感知质量之间的权衡。"
                }
            }
        },

        {
            id: "advanced-1",
            phase: "advanced",
            type: "mcq",
            category: "advanced",
            title: { en: "DCT role", zh: "DCT 作用" },
            prompt: {
                en: "What is the role of DCT in image compression?",
                zh: "DCT 在图像压缩中的作用是什么？"
            },
            options: [
                { en: "It transforms image data into frequency components", zh: "它把图像数据转换为频率分量" },
                { en: "It doubles image resolution", zh: "它会把图像分辨率翻倍" },
                { en: "It converts images into sound", zh: "它会把图像变成声音" },
                { en: "It stores every pixel without change", zh: "它会不加变化地保存每个像素" }
            ],
            answer: 0,
            explanation: {
                en: "DCT helps separate image information into frequency components so that less important information can be reduced more efficiently.",
                zh: "DCT 可以把图像信息分解为频率分量，便于更高效地减少不太重要的信息。"
            },
            followUp: {
                prompt: {
                    en: "Why is a frequency representation useful in compression?",
                    zh: "为什么频率表示对压缩有帮助？"
                },
                options: [
                    { en: "It helps prioritise more visually important information", zh: "它有助于优先保留更重要的视觉信息" },
                    { en: "It prevents any file from being compressed", zh: "它会阻止文件被压缩" },
                    { en: "It always keeps all data unchanged", zh: "它总会保持全部数据不变" }
                ],
                answer: 0,
                explanation: {
                    en: "Frequency-domain analysis helps compression keep important visual content while reducing less critical detail.",
                    zh: "频域分析有助于在保留重要视觉内容的同时，减少不太关键的细节。"
                }
            }
        },
        {
            id: "advanced-2",
            phase: "advanced",
            type: "visual",
            category: "visual",
            title: { en: "Banding recognition", zh: "色带识别" },
            prompt: {
                en: "Which sample more clearly shows colour banding caused by strong compression or reduced precision?",
                zh: "哪一个样本更明显地表现出了因压缩过强或精度降低导致的色带现象？"
            },
            visuals: [
                {
                    title: { en: "Sample A", zh: "样本 A" },
                    caption: { en: "Smooth tonal transition", zh: "色调过渡平滑" },
                    svg: gradientSmoothSVG()
                },
                {
                    title: { en: "Sample B", zh: "样本 B" },
                    caption: { en: "Visible step-like colour bands", zh: "能看到明显分层的颜色条带" },
                    svg: bandingSVG()
                }
            ],
            options: [
                { en: "Sample A", zh: "样本 A" },
                { en: "Sample B", zh: "样本 B" },
                { en: "Both are equally smooth", zh: "两者一样平滑" },
                { en: "Neither uses colour", zh: "两者都没有颜色" }
            ],
            answer: 1,
            explanation: {
                en: "Sample B shows visible steps between tones, which is typical colour banding.",
                zh: "样本 B 在色调之间出现了明显的分层台阶，这就是典型的色带现象。"
            },
            followUp: {
                prompt: {
                    en: "Banding is easiest to notice in which kind of region?",
                    zh: "色带最容易在哪类区域中被注意到？"
                },
                options: [
                    { en: "Smooth gradients", zh: "平滑渐变区域" },
                    { en: "Completely black text only", zh: "只有纯黑文字时" },
                    { en: "File menus", zh: "文件菜单中" }
                ],
                answer: 0,
                explanation: {
                    en: "Banding is easiest to spot where tones should change smoothly.",
                    zh: "色带最容易在本应平滑变化的渐变区域中被发现。"
                }
            }
        },
        {
            id: "advanced-3",
            phase: "advanced",
            type: "mcq",
            category: "advanced",
            title: { en: "Strategy choice", zh: "策略选择" },
            prompt: {
                en: "You must reduce file size for web delivery, but visible artifacts are becoming obvious. What is the best next decision?",
                zh: "你必须为网页传输减小文件体积，但可见伪影已经很明显。下一步最合理的做法是什么？"
            },
            options: [
                { en: "Reduce compression strength slightly to improve perceived quality", zh: "适当降低压缩强度以改善感知质量" },
                { en: "Keep compressing until all detail is gone", zh: "继续压缩直到细节几乎消失" },
                { en: "Assume artifacts never matter", zh: "认为伪影永远不重要" },
                { en: "Ignore the visual result completely", zh: "完全忽略视觉结果" }
            ],
            answer: 0,
            explanation: {
                en: "Good compression design balances file size against visible quality rather than pushing compression until artifacts dominate.",
                zh: "好的压缩设计会在文件体积和可见质量之间取得平衡，而不是一味压缩到伪影主导画面。"
            },
            followUp: {
                prompt: {
                    en: "What is the key design principle here?",
                    zh: "这里体现的关键设计原则是什么？"
                },
                options: [
                    { en: "Balance file size and perceived quality", zh: "平衡文件体积与感知质量" },
                    { en: "Always choose the smallest file at any cost", zh: "不惜一切代价选择最小文件" },
                    { en: "Never evaluate the final image", zh: "永远不要评估最终图像" }
                ],
                answer: 0,
                explanation: {
                    en: "Compression decisions should be guided by both efficiency and acceptable visual outcome.",
                    zh: "压缩决策应同时考虑效率和可接受的视觉效果。"
                }
            }
        },
        {
            id: "advanced-4",
            phase: "advanced",
            type: "mcq",
            category: "methods",
            title: { en: "Perceptual coding", zh: "感知编码" },
            prompt: {
                en: "Why can lossy compression still be useful even though some data is removed?",
                zh: "为什么即使丢失了一部分数据，有损压缩仍然很有用？"
            },
            options: [
                { en: "Because not all removed information is equally noticeable to human vision", zh: "因为被移除的信息并非都同样容易被人眼察觉" },
                { en: "Because it always preserves every detail exactly", zh: "因为它总能精确保留每个细节" },
                { en: "Because people cannot see any image differences at all", zh: "因为人根本看不出任何图像差异" },
                { en: "Because lossy compression does not use algorithms", zh: "因为有损压缩不使用算法" }
            ],
            answer: 0,
            explanation: {
                en: "Perceptual coding is useful because some information matters less to human observers than other information.",
                zh: "感知编码之所以有用，是因为有些信息对人类观察者来说没有那么重要。"
            },
            followUp: {
                prompt: {
                    en: "Perceptual compression mainly depends on what idea?",
                    zh: "感知压缩主要依赖于什么思想？"
                },
                options: [
                    { en: "Some visual information is less noticeable than other information", zh: "有些视觉信息比其他信息更不容易被察觉" },
                    { en: "Every pixel is equally important in all cases", zh: "所有像素在任何情况下都同样重要" },
                    { en: "Compression only works for text files", zh: "压缩只对文本文件有效" }
                ],
                answer: 0,
                explanation: {
                    en: "Perceptual compression uses the fact that human vision is more sensitive to some changes than others.",
                    zh: "感知压缩利用了人眼对不同变化敏感度不同这一事实。"
                }
            }
        }
    ];

    const questionMap = {};
    questionBank.forEach((q) => {
        questionMap[q.id] = q;
    });

    const diagnosticIds = questionBank.filter(q => q.phase === "diagnostic").map(q => q.id);
    const foundationIds = questionBank.filter(q => q.phase === "foundation").map(q => q.id);
    const intermediateIds = questionBank.filter(q => q.phase === "intermediate").map(q => q.id);
    const advancedIds = questionBank.filter(q => q.phase === "advanced").map(q => q.id);

    const state = {
        currentLang: "en",
        fontSize: 16,
        savedSnapshot: null,
        session: null
    };

    const elements = {
        breadcrumbText: document.getElementById("breadcrumbText"),

        logoText: document.getElementById("logoText"),
        navHome: document.getElementById("navHome"),
        navLearning: document.getElementById("navLearning"),
        navGames: document.getElementById("navGames"),
        navTest: document.getElementById("navTest"),
        navCommunity: document.getElementById("navCommunity"),

        footerTitle: document.getElementById("footerTitle"),
        footerQuickLinks: document.getElementById("footerQuickLinks"),
        footerHome: document.getElementById("footerHome"),
        footerLearning: document.getElementById("footerLearning"),
        footerGames: document.getElementById("footerGames"),
        footerTest: document.getElementById("footerTest"),
        footerCommunity: document.getElementById("footerCommunity"),

        languageLabel: document.getElementById("languageLabel"),
        fontSizeLabel: document.getElementById("fontSizeLabel"),

        heroBadge: document.getElementById("heroBadge"),
        introTitle: document.getElementById("introTitle"),
        introDescription: document.getElementById("introDescription"),
        infoTitle1: document.getElementById("infoTitle1"),
        infoText1: document.getElementById("infoText1"),
        infoTitle2: document.getElementById("infoTitle2"),
        infoText2: document.getElementById("infoText2"),
        infoTitle3: document.getElementById("infoTitle3"),
        infoText3: document.getElementById("infoText3"),
        infoTitle4: document.getElementById("infoTitle4"),
        infoText4: document.getElementById("infoText4"),

        resumeBox: document.getElementById("resumeBox"),
        resumeText: document.getElementById("resumeText"),
        resumeQuizBtn: document.getElementById("resumeQuizBtn"),

        startQuizBtn: document.getElementById("startQuizBtn"),
        goLearningBtn: document.getElementById("goLearningBtn"),

        introScreen: document.getElementById("introScreen"),
        quizScreen: document.getElementById("quizScreen"),
        resultScreen: document.getElementById("resultScreen"),

        routeBadge: document.getElementById("routeBadge"),
        routeDescription: document.getElementById("routeDescription"),
        progressLabel: document.getElementById("progressLabel"),
        progressCount: document.getElementById("progressCount"),
        progressTrack: document.getElementById("progressTrack"),
        progressBar: document.getElementById("progressBar"),

        difficultyBadge: document.getElementById("difficultyBadge"),
        questionNumberText: document.getElementById("questionNumberText"),
        questionTitle: document.getElementById("questionTitle"),
        questionPrompt: document.getElementById("questionPrompt"),
        visualZone: document.getElementById("visualZone"),
        optionsContainer: document.getElementById("optionsContainer"),
        submitBtn: document.getElementById("submitBtn"),
        prevBtn: document.getElementById("prevBtn"),
        nextBtn: document.getElementById("nextBtn"),
        statusMessage: document.getElementById("statusMessage"),
        feedbackCard: document.getElementById("feedbackCard"),
        feedbackTitle: document.getElementById("feedbackTitle"),
        feedbackText: document.getElementById("feedbackText"),

        followUpCard: document.getElementById("followUpCard"),
        followUpBadge: document.getElementById("followUpBadge"),
        followUpTitle: document.getElementById("followUpTitle"),
        followUpPrompt: document.getElementById("followUpPrompt"),
        followUpOptions: document.getElementById("followUpOptions"),
        submitFollowUpBtn: document.getElementById("submitFollowUpBtn"),
        followUpFeedback: document.getElementById("followUpFeedback"),
        followUpFeedbackTitle: document.getElementById("followUpFeedbackTitle"),
        followUpFeedbackText: document.getElementById("followUpFeedbackText"),

        resultRouteBadge: document.getElementById("resultRouteBadge"),
        learnerTag: document.getElementById("learnerTag"),
        resultTitle: document.getElementById("resultTitle"),
        resultSubtitle: document.getElementById("resultSubtitle"),
        scoreText: document.getElementById("scoreText"),
        percentageText: document.getElementById("percentageText"),
        performanceText: document.getElementById("performanceText"),
        profileTitle: document.getElementById("profileTitle"),
        profileGrid: document.getElementById("profileGrid"),
        suggestionsTitle: document.getElementById("suggestionsTitle"),
        suggestionsList: document.getElementById("suggestionsList"),
        reviewTitle: document.getElementById("reviewTitle"),
        wrongAnswersList: document.getElementById("wrongAnswersList"),
        retryWrongBtn: document.getElementById("retryWrongBtn"),
        restartAssessmentBtn: document.getElementById("restartAssessmentBtn"),
        reviewLearningBtn: document.getElementById("reviewLearningBtn"),

        langButtons: document.querySelectorAll("[data-lang]"),
        fontButtons: document.querySelectorAll("[data-font]")
    };

    function t(key) {
        return uiText[state.currentLang][key] || key;
    }

    function saveState(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error(e);
        }
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    function clearState() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.error(e);
        }
    }

    function getQuestionById(id) {
        return questionMap[id];
    }

    function showScreen(name) {
        elements.introScreen.classList.add("hidden");
        elements.quizScreen.classList.add("hidden");
        elements.resultScreen.classList.add("hidden");

        if (name === "intro") elements.introScreen.classList.remove("hidden");
        if (name === "quiz") elements.quizScreen.classList.remove("hidden");
        if (name === "result") elements.resultScreen.classList.remove("hidden");
    }

    function createEmptySession(mode, questionIds) {
        const answers = {};
        const submitted = {};
        const followUp = {};

        questionIds.forEach((id) => {
            answers[id] = null;
            submitted[id] = false;
            followUp[id] = {
                selected: null,
                submitted: false,
                correct: null
            };
        });

        return {
            mode,
            stage: "quiz",
            questionIds: [...questionIds],
            currentIndex: 0,
            answers,
            submitted,
            followUp,
            assignedBranch: null
        };
    }

    function startAdaptiveSession() {
        state.session = createEmptySession("adaptive", diagnosticIds);
        showScreen("quiz");
        renderQuiz();
        persistState();
    }

    function startRetrySession(wrongIds) {
        state.session = createEmptySession("retry", wrongIds);
        state.session.assignedBranch = "retry";
        showScreen("quiz");
        renderQuiz();
        persistState();
    }

    function getCurrentQuestionId() {
        return state.session.questionIds[state.session.currentIndex];
    }

    function getCurrentQuestion() {
        return getQuestionById(getCurrentQuestionId());
    }

    function isMainCorrect(questionId) {
        const question = getQuestionById(questionId);
        return state.session.answers[questionId] === question.answer;
    }

    function needsFollowUp(questionId) {
        const question = getQuestionById(questionId);
        return !!question.followUp && state.session.submitted[questionId] && !isMainCorrect(questionId);
    }

    function getRouteKey() {
        if (!state.session) return "routeDiagnostic";
        if (state.session.mode === "retry") return "routeRetry";
        if (!state.session.assignedBranch) return "routeDiagnostic";
        if (state.session.assignedBranch === "foundation") return "routeFoundation";
        if (state.session.assignedBranch === "intermediate") return "routeIntermediate";
        if (state.session.assignedBranch === "advanced") return "routeAdvanced";
        return "routeDiagnostic";
    }

    function getRouteDescKey() {
        if (!state.session) return "routeDiagnosticDesc";
        if (state.session.mode === "retry") return "routeRetryDesc";
        if (!state.session.assignedBranch) return "routeDiagnosticDesc";
        if (state.session.assignedBranch === "foundation") return "routeFoundationDesc";
        if (state.session.assignedBranch === "intermediate") return "routeIntermediateDesc";
        if (state.session.assignedBranch === "advanced") return "routeAdvancedDesc";
        return "routeDiagnosticDesc";
    }

    function getDifficultyLabel(question) {
        if (!question) return "";
        if (state.session.mode === "retry") return t("difficultyRetry");
        if (question.phase === "diagnostic") return t("difficultyDiagnostic");
        if (question.phase === "foundation") return t("difficultyFoundation");
        if (question.phase === "intermediate") return t("difficultyIntermediate");
        if (question.phase === "advanced") return t("difficultyAdvanced");
        return t("difficultyDiagnostic");
    }

    function setLanguage(lang) {
        state.currentLang = lang;

        elements.langButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.lang === lang);
        });

        elements.logoText.textContent = t("logo");
        elements.navHome.textContent = t("navHome");
        elements.navLearning.textContent = t("navLearning");
        elements.navGames.textContent = t("navGames");
        elements.navTest.textContent = t("navTest");
        elements.navCommunity.textContent = t("navCommunity");

        elements.footerTitle.textContent = t("logo");
        elements.footerQuickLinks.textContent = t("footerQuickLinks");
        elements.footerHome.textContent = t("navHome");
        elements.footerLearning.textContent = t("navLearning");
        elements.footerGames.textContent = t("navGames");
        elements.footerTest.textContent = t("navTest");
        elements.footerCommunity.textContent = t("navCommunity");

        elements.breadcrumbText.innerHTML = t("breadcrumb");
        elements.languageLabel.textContent = t("languageLabel");
        elements.fontSizeLabel.textContent = t("fontSizeLabel");

        elements.heroBadge.textContent = t("heroBadge");
        elements.introTitle.textContent = t("introTitle");
        elements.introDescription.textContent = t("introDescription");
        elements.infoTitle1.textContent = t("infoTitle1");
        elements.infoText1.textContent = t("infoText1");
        elements.infoTitle2.textContent = t("infoTitle2");
        elements.infoText2.textContent = t("infoText2");
        elements.infoTitle3.textContent = t("infoTitle3");
        elements.infoText3.textContent = t("infoText3");
        elements.infoTitle4.textContent = t("infoTitle4");
        elements.infoText4.textContent = t("infoText4");
        elements.resumeText.textContent = t("resumeText");
        elements.resumeQuizBtn.textContent = t("resumeQuiz");
        elements.startQuizBtn.textContent = t("startAssessment");
        elements.goLearningBtn.textContent = t("goLearning");

        elements.progressLabel.textContent = t("progressLabel");
        elements.submitBtn.textContent = t("submitAnswer");
        elements.prevBtn.textContent = t("previousQuestion");
        elements.followUpBadge.textContent = t("followUpBadge");
        elements.submitFollowUpBtn.textContent = t("followUpButton");

        elements.resultTitle.textContent = t("resultTitle");
        elements.resultSubtitle.textContent = t("resultSubtitle");
        elements.profileTitle.textContent = t("profileTitle");
        elements.suggestionsTitle.textContent = t("suggestionsTitle");
        elements.reviewTitle.textContent = t("reviewTitle");
        elements.retryWrongBtn.textContent = t("retryWrong");
        elements.restartAssessmentBtn.textContent = t("restartFull");
        elements.reviewLearningBtn.textContent = t("reviewLearning");

        if (state.session && state.session.stage === "quiz") {
            renderQuiz();
        }

        if (state.session && state.session.stage === "result") {
            renderResult();
        }

        showResumeIfAvailable(false);
        persistState();
    }

    function setFontSize(size) {
        state.fontSize = Number(size);
        document.documentElement.style.setProperty("--base-font-size", `${state.fontSize}px`);

        elements.fontButtons.forEach((button) => {
            button.classList.toggle("active", Number(button.dataset.font) === state.fontSize);
        });

        persistState();
    }

    function showStatus(message, type = "info") {
        elements.statusMessage.textContent = message;
        elements.statusMessage.className = `status-message ${type}`;
    }

    function hideStatus() {
        elements.statusMessage.textContent = "";
        elements.statusMessage.className = "status-message hidden";
    }

    function renderRouteInfo() {
        elements.routeBadge.textContent = t(getRouteKey());
        elements.routeDescription.textContent = t(getRouteDescKey());
    }

    function renderVisualZone(question) {
        if (question.type !== "visual" || !question.visuals || !question.visuals.length) {
            elements.visualZone.classList.add("hidden");
            elements.visualZone.innerHTML = "";
            return;
        }

        elements.visualZone.classList.remove("hidden");
        elements.visualZone.innerHTML = question.visuals.map((panel) => {
            return `
                <div class="visual-card">
                    <h4>${panel.title[state.currentLang]}</h4>
                    <div class="visual-frame">${panel.svg}</div>
                    <p class="visual-caption">${panel.caption[state.currentLang]}</p>
                </div>
            `;
        }).join("");
    }

    function renderOptions(question) {
        const questionId = question.id;
        const selected = state.session.answers[questionId];
        const submitted = state.session.submitted[questionId];

        elements.optionsContainer.innerHTML = "";

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "option";
            optionDiv.tabIndex = 0;

            if (selected === index) optionDiv.classList.add("selected");
            if (submitted) {
                optionDiv.classList.add("locked");
                if (index === question.answer) optionDiv.classList.add("correct");
                if (selected === index && index !== question.answer) optionDiv.classList.add("wrong");
            }

            optionDiv.innerHTML = `
                <input type="radio" name="mainQuestion" value="${index}" ${selected === index ? "checked" : ""} ${submitted ? "disabled" : ""}>
                <label>${option[state.currentLang]}</label>
            `;

            const selectOption = () => {
                if (submitted) return;
                state.session.answers[questionId] = index;
                showStatus(t("statusOptionSaved"), "info");
                persistState();
                renderQuiz();
            };

            optionDiv.addEventListener("click", selectOption);
            optionDiv.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectOption();
                }
            });

            elements.optionsContainer.appendChild(optionDiv);
        });
    }

    function renderMainFeedback(question) {
        const questionId = question.id;
        if (!state.session.submitted[questionId]) {
            elements.feedbackCard.className = "feedback-card";
            elements.feedbackTitle.textContent = "";
            elements.feedbackText.textContent = "";
            return;
        }

        const correct = isMainCorrect(questionId);
        elements.feedbackCard.className = `feedback-card show ${correct ? "correct" : "incorrect"}`;
        elements.feedbackTitle.textContent = correct ? t("correctTitle") : t("incorrectTitle");
        elements.feedbackText.textContent = question.explanation[state.currentLang];
    }

    function renderFollowUp(question) {
        const questionId = question.id;
        if (!needsFollowUp(questionId)) {
            elements.followUpCard.classList.add("hidden");
            elements.followUpTitle.textContent = "";
            elements.followUpPrompt.textContent = "";
            elements.followUpOptions.innerHTML = "";
            elements.followUpFeedback.classList.add("hidden");
            elements.followUpFeedbackTitle.textContent = "";
            elements.followUpFeedbackText.textContent = "";
            return;
        }

        const followUpState = state.session.followUp[questionId];
        const followUp = question.followUp;

        elements.followUpCard.classList.remove("hidden");
        elements.followUpTitle.textContent = t("followUpBadge");
        elements.followUpPrompt.textContent = followUp.prompt[state.currentLang];
        elements.submitFollowUpBtn.textContent = t("followUpButton");

        elements.followUpOptions.innerHTML = "";
        followUp.options.forEach((option, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "follow-up-option";
            optionDiv.tabIndex = 0;

            if (followUpState.selected === index) optionDiv.classList.add("selected");
            if (followUpState.submitted) {
                optionDiv.classList.add("locked");
                if (index === followUp.answer) optionDiv.classList.add("correct");
                if (followUpState.selected === index && index !== followUp.answer) optionDiv.classList.add("wrong");
            }

            optionDiv.innerHTML = `
                <input type="radio" name="followUpQuestion" value="${index}" ${followUpState.selected === index ? "checked" : ""} ${followUpState.submitted ? "disabled" : ""}>
                <label>${option[state.currentLang]}</label>
            `;

            const selectFollowUp = () => {
                if (followUpState.submitted) return;
                followUpState.selected = index;
                showStatus(t("statusFollowUpSaved"), "info");
                persistState();
                renderFollowUp(question);
            };

            optionDiv.addEventListener("click", selectFollowUp);
            optionDiv.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectFollowUp();
                }
            });

            elements.followUpOptions.appendChild(optionDiv);
        });

        if (followUpState.submitted) {
            elements.followUpFeedback.classList.remove("hidden");
            elements.followUpFeedbackTitle.textContent = followUpState.correct ? t("followUpCorrect") : t("followUpIncorrect");
            elements.followUpFeedbackText.textContent = followUp.explanation[state.currentLang];
        } else {
            elements.followUpFeedback.classList.add("hidden");
            elements.followUpFeedbackTitle.textContent = "";
            elements.followUpFeedbackText.textContent = "";
        }
    }

    function updateProgress() {
        const total = state.session.questionIds.length;
        const current = state.session.currentIndex + 1;
        const submittedCount = state.session.questionIds.filter((id) => state.session.submitted[id]).length;
        const percentage = Math.round((submittedCount / total) * 100);

        elements.progressCount.textContent = `${current} / ${total}`;
        elements.progressBar.style.width = `${percentage}%`;
        elements.progressTrack.setAttribute("aria-valuenow", String(percentage));
    }

    function renderQuiz() {
        const question = getCurrentQuestion();
        renderRouteInfo();
        updateProgress();

        elements.difficultyBadge.textContent = getDifficultyLabel(question);

        if (state.currentLang === "en") {
            elements.questionNumberText.textContent = `${t("questionLabel")} ${state.session.currentIndex + 1} ${t("ofLabel")} ${state.session.questionIds.length}`;
        } else {
            elements.questionNumberText.textContent = `${t("questionLabel")} ${state.session.currentIndex + 1} ${t("ofLabel")} ${state.session.questionIds.length}`;
        }

        elements.questionTitle.textContent = question.title[state.currentLang];
        elements.questionPrompt.textContent = question.prompt[state.currentLang];

        renderVisualZone(question);
        renderOptions(question);
        renderMainFeedback(question);
        renderFollowUp(question);

        elements.submitBtn.disabled = state.session.submitted[question.id];
        elements.prevBtn.disabled = state.session.currentIndex === 0;
        elements.nextBtn.textContent =
            state.session.currentIndex === state.session.questionIds.length - 1
                ? t("finishAssessment")
                : t("nextQuestion");

        if (!state.session.submitted[question.id] && state.session.answers[question.id] === null) {
            hideStatus();
        }
    }

    function submitMainAnswer() {
        const question = getCurrentQuestion();
        const questionId = question.id;

        if (state.session.answers[questionId] === null) {
            showStatus(t("statusChooseAnswer"), "error");
            return;
        }

        state.session.submitted[questionId] = true;
        hideStatus();
        persistState();
        renderQuiz();
    }

    function submitFollowUp() {
        const question = getCurrentQuestion();
        const questionId = question.id;
        const followUpState = state.session.followUp[questionId];
        const followUp = question.followUp;

        if (!needsFollowUp(questionId)) return;

        if (followUpState.selected === null) {
            showStatus(t("statusSelectFollowUp"), "error");
            return;
        }

        followUpState.submitted = true;
        followUpState.correct = followUpState.selected === followUp.answer;
        hideStatus();
        persistState();
        renderFollowUp(question);
    }

    function assignAdaptiveBranchIfNeeded() {
        if (state.session.mode !== "adaptive") return;
        if (state.session.assignedBranch) return;

        const allDiagnosticSubmitted = diagnosticIds.every((id) => state.session.submitted[id]);
        if (!allDiagnosticSubmitted) return;

        let diagnosticScore = 0;
        diagnosticIds.forEach((id) => {
            if (isMainCorrect(id)) diagnosticScore++;
        });

        let branch = "foundation";
        if (diagnosticScore === 1) branch = "intermediate";
        if (diagnosticScore === 2) branch = "advanced";

        state.session.assignedBranch = branch;
        const newIds =
            branch === "foundation" ? foundationIds :
                branch === "intermediate" ? intermediateIds :
                    advancedIds;

        newIds.forEach((id) => {
            if (!state.session.questionIds.includes(id)) {
                state.session.questionIds.push(id);
                state.session.answers[id] = null;
                state.session.submitted[id] = false;
                state.session.followUp[id] = {
                    selected: null,
                    submitted: false,
                    correct: null
                };
            }
        });

        if (branch === "foundation") showStatus(t("adaptiveAssignedFoundation"), "info");
        if (branch === "intermediate") showStatus(t("adaptiveAssignedIntermediate"), "info");
        if (branch === "advanced") showStatus(t("adaptiveAssignedAdvanced"), "info");
    }

    function goNext() {
        const questionId = getCurrentQuestionId();

        if (!state.session.submitted[questionId]) {
            showStatus(t("statusSubmitBeforeNext"), "error");
            return;
        }

        if (needsFollowUp(questionId) && !state.session.followUp[questionId].submitted) {
            showStatus(t("statusSelectFollowUp"), "error");
            return;
        }

        assignAdaptiveBranchIfNeeded();

        if (state.session.currentIndex === state.session.questionIds.length - 1) {
            finishAssessment();
            return;
        }

        state.session.currentIndex++;
        hideStatus();
        persistState();
        renderQuiz();
    }

    function goPrevious() {
        if (state.session.currentIndex === 0) return;
        state.session.currentIndex--;
        hideStatus();
        persistState();
        renderQuiz();
    }

    function calculateScore() {
        let score = 0;
        state.session.questionIds.forEach((id) => {
            if (state.session.submitted[id] && isMainCorrect(id)) score++;
        });
        return score;
    }

    function buildProfile() {
        const profile = {
            basics: { correct: 0, total: 0 },
            visual: { correct: 0, total: 0 },
            methods: { correct: 0, total: 0 },
            advanced: { correct: 0, total: 0 }
        };

        state.session.questionIds.forEach((id) => {
            const question = getQuestionById(id);
            profile[question.category].total++;
            if (isMainCorrect(id)) profile[question.category].correct++;
        });

        return profile;
    }

    function getProfileLabel(percent) {
        if (percent >= 80) return t("profileStrong");
        if (percent >= 50) return t("profileDeveloping");
        return t("profileNeedsWork");
    }

    function getLearnerTag(profile, overallPercent) {
        const categories = Object.keys(profile);
        let strongest = "basics";
        let bestRatio = -1;

        categories.forEach((key) => {
            const item = profile[key];
            const ratio = item.total === 0 ? 0 : item.correct / item.total;
            if (ratio > bestRatio) {
                bestRatio = ratio;
                strongest = key;
            }
        });

        if (overallPercent >= 85) return t("learnerBalanced");
        if (strongest === "visual") return t("learnerVisual");
        if (strongest === "methods") return t("learnerMethods");
        if (strongest === "advanced") return t("learnerAdvanced");
        return t("learnerFoundation");
    }

    function renderProfile(profile) {
        const config = [
            { key: "basics", label: t("categoryBasics") },
            { key: "visual", label: t("categoryVisual") },
            { key: "methods", label: t("categoryMethods") },
            { key: "advanced", label: t("categoryAdvanced") }
        ];

        elements.profileGrid.innerHTML = config.map((item) => {
            const data = profile[item.key];
            const percent = data.total === 0 ? 0 : Math.round((data.correct / data.total) * 100);
            return `
                <div class="profile-item">
                    <h4>${item.label}</h4>
                    <div class="profile-meta">
                        <span>${data.correct} / ${data.total}</span>
                        <span>${getProfileLabel(percent)}</span>
                    </div>
                    <div class="mini-progress">
                        <div class="mini-progress-bar" style="width:${percent}%"></div>
                    </div>
                </div>
            `;
        }).join("");
    }

    function buildSuggestions(profile, overallPercent) {
        const suggestions = [];
        const ratios = Object.keys(profile).map((key) => {
            const data = profile[key];
            return {
                key,
                percent: data.total === 0 ? 0 : Math.round((data.correct / data.total) * 100)
            };
        });

        ratios.sort((a, b) => a.percent - b.percent);
        const weakest = ratios[0];

        if (weakest.key === "basics") suggestions.push(t("suggestionBasics"));
        if (weakest.key === "visual") suggestions.push(t("suggestionVisual"));
        if (weakest.key === "methods") suggestions.push(t("suggestionMethods"));
        if (weakest.key === "advanced") suggestions.push(t("suggestionAdvanced"));

        if (state.session.mode === "retry") {
            suggestions.push(t("suggestionRetry"));
        } else {
            if (state.session.assignedBranch === "foundation") suggestions.push(t("suggestionFoundation"));
            if (state.session.assignedBranch === "intermediate") suggestions.push(t("suggestionIntermediate"));
            if (state.session.assignedBranch === "advanced") suggestions.push(t("suggestionAdvanced"));
        }

        if (overallPercent >= 80) {
            suggestions.push(t("suggestionHighScore"));
        }

        return suggestions;
    }

    function renderSuggestions(profile, overallPercent) {
        const suggestions = buildSuggestions(profile, overallPercent);
        elements.suggestionsList.innerHTML = suggestions.map((text) => `<li>${text}</li>`).join("");
    }

    function getWrongQuestionIds() {
        return state.session.questionIds.filter((id) => !isMainCorrect(id));
    }

    function renderWrongAnswers() {
        const wrongIds = getWrongQuestionIds();

        if (!wrongIds.length) {
            elements.wrongAnswersList.innerHTML = `<p>${t("noWrongAnswers")}</p>`;
            return;
        }

        elements.wrongAnswersList.innerHTML = wrongIds.map((id, index) => {
            const question = getQuestionById(id);
            const userAnswerIndex = state.session.answers[id];
            const yourAnswer = userAnswerIndex === null
                ? t("noAnswer")
                : question.options[userAnswerIndex][state.currentLang];
            const correctAnswer = question.options[question.answer][state.currentLang];

            return `
                <div class="review-item">
                    <h4>${state.currentLang === "en" ? `Question ${index + 1}` : `第 ${index + 1} 题`}</h4>
                    <p><strong>${question.title[state.currentLang]}</strong></p>
                    <p>${question.prompt[state.currentLang]}</p>
                    <p>${t("yourAnswer")} ${yourAnswer}</p>
                    <p>${t("correctAnswer")} ${correctAnswer}</p>
                    <p>${question.explanation[state.currentLang]}</p>
                </div>
            `;
        }).join("");
    }

    function finishAssessment() {
        state.session.stage = "result";
        showScreen("result");
        renderResult();
        clearState();
    }

    function renderResult() {
        const total = state.session.questionIds.length;
        const score = calculateScore();
        const overallPercent = Math.round((score / total) * 100);
        const profile = buildProfile();

        elements.resultRouteBadge.textContent = t(getRouteKey());
        elements.learnerTag.textContent = getLearnerTag(profile, overallPercent);
        elements.resultTitle.textContent = t("resultTitle");
        elements.resultSubtitle.textContent = t("resultSubtitle");
        elements.scoreText.textContent = `${score} / ${total}`;
        elements.percentageText.textContent = `${t("percentagePrefix")} ${overallPercent}%`;

        if (overallPercent >= 80) {
            elements.performanceText.textContent = t("scoreSummaryHigh");
        } else if (overallPercent >= 50) {
            elements.performanceText.textContent = t("scoreSummaryMid");
        } else {
            elements.performanceText.textContent = t("scoreSummaryLow");
        }

        renderProfile(profile);
        renderSuggestions(profile, overallPercent);
        renderWrongAnswers();

        const wrongIds = getWrongQuestionIds();
        elements.retryWrongBtn.style.display = wrongIds.length ? "inline-flex" : "none";
    }

    function restartFullAssessment() {
        const confirmed = window.confirm(t("restartConfirm"));
        if (!confirmed) return;
        startAdaptiveSession();
    }

    function retryWrongQuestions() {
        const wrongIds = getWrongQuestionIds();
        if (!wrongIds.length) return;
        startRetrySession(wrongIds);
    }

    function persistState() {
        const snapshot = {
            currentLang: state.currentLang,
            fontSize: state.fontSize,
            session: state.session
        };

        if (state.session && state.session.stage === "quiz") {
            saveState(snapshot);
        }
    }

    function isValidSnapshot(snapshot) {
        if (!snapshot || !snapshot.session) return false;
        if (!Array.isArray(snapshot.session.questionIds)) return false;
        return snapshot.session.questionIds.every((id) => !!getQuestionById(id));
    }

    function showResumeIfAvailable(updateText = true) {
        const snapshot = loadState();

        if (isValidSnapshot(snapshot) && snapshot.session.stage === "quiz") {
            state.savedSnapshot = snapshot;
            elements.resumeBox.classList.remove("hidden");
            if (updateText) {
                elements.resumeText.textContent = t("resumeText");
                elements.resumeQuizBtn.textContent = t("resumeQuiz");
            }
        } else {
            state.savedSnapshot = null;
            elements.resumeBox.classList.add("hidden");
        }
    }

    function resumePreviousSession() {
        if (!state.savedSnapshot) return;

        state.currentLang = state.savedSnapshot.currentLang || "en";
        state.fontSize = Number(state.savedSnapshot.fontSize) || 16;
        state.session = state.savedSnapshot.session;

        setFontSize(state.fontSize);
        setLanguage(state.currentLang);
        showScreen("quiz");
        renderQuiz();
    }

    function hasUnfinishedProgress() {
        if (!state.session) return false;
        if (state.session.stage !== "quiz") return false;
        return state.session.questionIds.some((id) => {
            return state.session.answers[id] !== null || state.session.submitted[id];
        });
    }

    function bindEvents() {
        elements.langButtons.forEach((button) => {
            button.addEventListener("click", () => setLanguage(button.dataset.lang));
        });

        elements.fontButtons.forEach((button) => {
            button.addEventListener("click", () => setFontSize(button.dataset.font));
        });

        elements.startQuizBtn.addEventListener("click", startAdaptiveSession);
        elements.resumeQuizBtn.addEventListener("click", resumePreviousSession);

        elements.submitBtn.addEventListener("click", submitMainAnswer);
        elements.submitFollowUpBtn.addEventListener("click", submitFollowUp);
        elements.prevBtn.addEventListener("click", goPrevious);
        elements.nextBtn.addEventListener("click", goNext);

        elements.retryWrongBtn.addEventListener("click", retryWrongQuestions);
        elements.restartAssessmentBtn.addEventListener("click", restartFullAssessment);

        window.addEventListener("beforeunload", (event) => {
            if (hasUnfinishedProgress()) {
                event.preventDefault();
                event.returnValue = t("leaveConfirm");
            }
        });
    }

    function init() {
        bindEvents();
        setFontSize(state.fontSize);
        setLanguage(state.currentLang);
        showScreen("intro");
        showResumeIfAvailable();
    }

    init();
})();