window.quizSets = {
    easy: [
        {
            id: "easy-1",
            question: {
                en: "What is the main goal of data compression?",
                zh: "数据压缩的主要目标是什么？"
            },
            options: [
                { en: "To make files look more colorful", zh: "让文件看起来更丰富多彩" },
                { en: "To reduce file size and improve storage or transmission efficiency", zh: "减小文件大小并提高存储或传输效率" },
                { en: "To increase internet speed directly", zh: "直接提升网络速度" },
                { en: "To add more pixels to an image", zh: "给图像增加更多像素" }
            ],
            answer: 1,
            explanation: {
                en: "Compression is used to store or send data using fewer bits, which saves space and reduces transmission cost.",
                zh: "压缩的目的是用更少的比特来存储或传输数据，从而节省空间并降低传输成本。"
            }
        },
        {
            id: "easy-2",
            question: {
                en: "Which type of compression keeps all original data?",
                zh: "哪一种压缩方式能够保留全部原始数据？"
            },
            options: [
                { en: "Lossy compression", zh: "有损压缩" },
                { en: "Lossless compression", zh: "无损压缩" },
                { en: "Visual compression", zh: "视觉压缩" },
                { en: "Analog compression", zh: "模拟压缩" }
            ],
            answer: 1,
            explanation: {
                en: "Lossless compression allows the original file to be reconstructed exactly, with no information lost.",
                zh: "无损压缩可以完整恢复原始文件，不会丢失任何信息。"
            }
        },
        {
            id: "easy-3",
            question: {
                en: "Why is compression useful for online transmission?",
                zh: "为什么压缩有利于在线传输？"
            },
            options: [
                { en: "Because compressed files usually need less bandwidth", zh: "因为压缩后的文件通常需要更少带宽" },
                { en: "Because it changes the monitor size", zh: "因为它会改变显示器尺寸" },
                { en: "Because it adds subtitles automatically", zh: "因为它会自动添加字幕" },
                { en: "Because it removes all image details", zh: "因为它会移除所有图像细节" }
            ],
            answer: 0,
            explanation: {
                en: "Smaller files are faster to upload, download, and stream because they require less data transfer.",
                zh: "文件变小后，上传、下载和流媒体播放都会更快，因为需要传输的数据更少。"
            }
        }
    ],

    medium: [
        {
            id: "medium-1",
            question: {
                en: "What does redundancy mean in data compression?",
                zh: "在数据压缩中，redundancy（冗余）指的是什么？"
            },
            options: [
                { en: "Data that is repeated or predictable", zh: "重复出现或可预测的数据" },
                { en: "Data that is encrypted", zh: "被加密的数据" },
                { en: "Data that has no color", zh: "没有颜色的数据" },
                { en: "Data stored on paper", zh: "存储在纸上的数据" }
            ],
            answer: 0,
            explanation: {
                en: "Compression works by reducing redundancy, meaning repeated or predictable information can be represented more efficiently.",
                zh: "压缩通过减少冗余来实现，也就是把重复或可预测的信息用更高效的方式表示出来。"
            }
        },
        {
            id: "medium-2",
            question: {
                en: "Which image is most suitable for Run-Length Encoding (RLE)?",
                zh: "哪一类图像最适合使用行程编码（RLE）？"
            },
            options: [
                { en: "A photo with many detailed textures", zh: "具有大量细节纹理的照片" },
                { en: "An image with large areas of the same color", zh: "大面积颜色相同的图像" },
                { en: "A noisy low-light image", zh: "有很多噪点的低光图像" },
                { en: "A 3D animation with many changes", zh: "变化很多的 3D 动画" }
            ],
            answer: 1,
            explanation: {
                en: "RLE is effective when the same value appears many times in a row, such as large flat-color regions.",
                zh: "当相同数值连续重复出现时，RLE 会非常有效，例如大面积纯色区域。"
            }
        },
        {
            id: "medium-3",
            question: {
                en: "What is one disadvantage of lossy compression?",
                zh: "有损压缩的一个缺点是什么？"
            },
            options: [
                { en: "It always increases file size", zh: "它总会增大文件大小" },
                { en: "It may permanently remove some image details", zh: "它可能永久丢失部分图像细节" },
                { en: "It cannot be used for images", zh: "它不能用于图像" },
                { en: "It requires no algorithm", zh: "它不需要算法" }
            ],
            answer: 1,
            explanation: {
                en: "Lossy compression achieves smaller file sizes by discarding less important information, which can reduce quality.",
                zh: "有损压缩通过丢弃部分不太重要的信息来减小文件大小，因此可能会降低质量。"
            }
        }
    ],

    hard: [
        {
            id: "hard-1",
            question: {
                en: "Why is JPEG considered a lossy compression format?",
                zh: "为什么 JPEG 被认为是一种有损压缩格式？"
            },
            options: [
                { en: "Because it stores every pixel exactly", zh: "因为它会精确保存每一个像素" },
                { en: "Because it removes some visual information to reduce file size", zh: "因为它会删除一部分视觉信息来减小文件大小" },
                { en: "Because it can only store black-and-white images", zh: "因为它只能保存黑白图像" },
                { en: "Because it requires a server to open", zh: "因为它必须依赖服务器才能打开" }
            ],
            answer: 1,
            explanation: {
                en: "JPEG reduces file size by discarding some image information that is considered less noticeable to human vision.",
                zh: "JPEG 会丢弃一部分人眼不太容易察觉的图像信息，从而减小文件大小。"
            }
        },
        {
            id: "hard-2",
            question: {
                en: "What may appear when image compression is too strong?",
                zh: "当图像压缩过强时，可能会出现什么现象？"
            },
            options: [
                { en: "More accurate colors", zh: "颜色更准确" },
                { en: "Block artifacts and visible quality loss", zh: "方块伪影和明显的质量下降" },
                { en: "A larger file size", zh: "文件体积变大" },
                { en: "A better camera lens", zh: "相机镜头效果更好" }
            ],
            answer: 1,
            explanation: {
                en: "When compression is too aggressive, visual artifacts such as blocking, blurring, or ringing may become visible.",
                zh: "当压缩过于激进时，可能会出现方块效应、模糊或振铃等可见失真。"
            }
        },
        {
            id: "hard-3",
            question: {
                en: "What is the role of DCT in image compression?",
                zh: "DCT 在图像压缩中的作用是什么？"
            },
            options: [
                { en: "It changes images into sound waves", zh: "把图像变成声波" },
                { en: "It transforms image data into frequency components for more efficient compression", zh: "把图像数据变成频率分量，以便更高效压缩" },
                { en: "It directly doubles image resolution", zh: "直接把图像分辨率翻倍" },
                { en: "It encrypts the image for safety", zh: "为了安全而对图像进行加密" }
            ],
            answer: 1,
            explanation: {
                en: "DCT helps represent image blocks in frequency form, making it easier to keep important information and reduce less important parts.",
                zh: "DCT 会把图像块转换到频率域，更方便保留重要信息并压缩不太重要的部分。"
            }
        }
    ]
};