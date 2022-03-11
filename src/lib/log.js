import mongoose from 'mongoose';
import logger from '../logger';

const Schema = mongoose.Schema;

/********************** Req Log ***********************/

const ReqLogSchema = new Schema({
  path: String,
  methodName: String,
  payloadRequest: Schema.Types.Mixed,
  payloadResponse: Schema.Types.Mixed,
  statusCode: Number,
  exception: Schema.Types.Mixed,
  createdDate: { type: Date, default: () => new Date() },
});

const ReqLogModel = mongoose.model('req_log', ReqLogSchema, 'req_log');

const log = async (
  path,
  methodName,
  payloadRequest,
  payloadResponse,
  statusCode,
  exception = null
) => {
  try {
    await ReqLogModel.create({
      path,
      methodName,
      payloadRequest,
      payloadResponse,
      statusCode,
      exception,
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.httpLog = async (path, methodName, req) => {
  await log(
    path,
    methodName,
    {
      url: `${req.config.method} ${req.config.url}`,
      headers: req.config.headers,
      data: req.config.data,
    },
    req.data,
    req.status
  );
};

exports.handleHttpError = async (path, methodName, error) => {
  if (error.isAxiosError) {
    let errorMessage = null;
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = ` - ${error.response.data.message.toString()}`;
    }

    await log(
      path,
      methodName,
      {
        url: `${error.response.config.method} ${error.response.config.url}`,
        headers: error.response.config.headers,
        data: error.response.config.data,
      },
      error.stack,
      error.response.status,
      `${error.message}${errorMessage}`
    );
  }
};
