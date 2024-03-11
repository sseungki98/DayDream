const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const s3Client = new S3Client({
  credentials: fromIni({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY_ID,
  }),
  region: process.env.AWS_REGION,
});

exports.upload = multer();

exports.uploadImage = async (req, res, next) => {
  try {
    const { file } = req;
    const fileStream = file.buffer;

    const uploadParams = {
      Bucket: "day-dream", // S3 버킷 이름
      Key: `${Date.now()}-${file.originalname}`, // S3에 저장될 파일 이름
      Body: fileStream, // 파일 데이터
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const getObjectParams = {
      Bucket: "day-dream",
      Key: uploadParams.Key,
      ResponseContentDisposition: "inline", // 이미지를 웹 페이지에서 표시할 때 사용하는 옵션
      ResponseContentType: file.mimetype, // 이미지의 MIME 타입 설정
    };
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand(getObjectParams),
      { expiresIn: 3600 },
    ); // 서명된 URL 생성

    req.fileUrl = url; // req 객체에 파일 URL 추가

    next();
  } catch (error) {
    console.error("Error uploading file:", error);
    next(error); // 에러 핸들러 미들웨어로 전달
  }
};
