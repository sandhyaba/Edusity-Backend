const { default: mongoose } = require("mongoose");

async function axiosRequest(url, body, headers, method = "POST") {
    try {
        let data = JSON.stringify(body);
    let newHeaders = {}
    if (headers != null) {
      newHeaders = {
        "Content-Type" : "application/json",
        authorization: headers.authorization
      }
    }
    let config = {
      method: method,
      url: url,
    }
    if (body) {
      config.data = data
      
      config.headers = { "Content-Type" : "application/json" }
    }
    if (headers) {
      config.headers = newHeaders
    }
    
    const response = await axios(config);
    return response;
    } catch (error) {
        console.log("Error : ", error);
        return [];
    }
}

const removeUpdatedAtAndV = { __v: 0, updatedAt: 0 };
const excludedFields = ["status", "updatedAt", "__v"];
const removeComman = { __v: 0, status: 0, createdAt: 0, updatedAt: 0 };
const userMiniObj = { _id: 1, first_name: 1, last_name: 1, image: 1 };

function geoNearPoint(lat, long, distanceField) {
    return {
        $geoNear: {
            near: {
                type: "Point",
                coordinates: [parseFloat(long), parseFloat(lat)],
            },
            distanceField: distanceField,
            distanceMultiplier: 0.001,
            spherical: true,
        },
    };
}

function fail(res, msg) {
    return res.status(200).send({ status: 0, message: msg, data: null });
}

function success(res, msg, data) {
    return res.status(200).send({ status: 1, message: msg, data: data });
}

function lookup(
    from,
    local,
    foreign,
    as,
    project = null,
    customPipeline = null
) {
    let obj = {
        $lookup: {
            from: from,
            localField: local,
            foreignField: foreign,
            as: as,
        },
    };

    if (project) {
        obj.$lookup.pipeline = [{ $project: project }];
    }

    if (customPipeline) {
        obj.$lookup.pipeline = customPipeline;

        if (project) {
            obj.$lookup.pipeline.push({ $project: project });
        }
    }

    return obj;
}

function unwind(property, preserveNullAndEmptyArrays = true) {
    if (preserveNullAndEmptyArrays) {
        return {
            $unwind: {
                path: property,
                preserveNullAndEmptyArrays: true,
            },
        };
    } else {
        return {
            $unwind: property,
        };
    }
}

function match(conditions) {
    return { $match: conditions };
}

function project(fields) {
    return { $project: fields };
}

function projecter(fields, flag = true) {
    let projection = {};
    for (let field of fields) {
        projection[field] = flag ? 1 : 0;
    }

    for (let field of excludedFields) {
        projection[field] = 0;
    }

    return { $project: projection };
}


function addFields(fieldsToAdd) {
    if (typeof fieldsToAdd !== "object" || fieldsToAdd === null) {
        console.error("Parameter to addFields must be a non-null object");
        return;
    }

    return {
        $addFields: fieldsToAdd,
    };
}

function ObjectId(value) {
    return new mongoose.Types.ObjectId(value);
}

const generateRandomPassword = () => {
    let password = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const length = 8;
    for (let i = 0; i < length; i++) {
        password += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return password;
};

function generateOTP() {
    // return "1234";
    // Generate a random 4-digit number
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
}

async function uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('https://your-worker-subdomain.your-worker-name.workers.dev/upload', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      return await response.text();
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }



module.exports = {
    removeUpdatedAtAndV,
    lookup,
    unwind,
    project,
    projecter,
    fail,
    success,
    match,
    addFields,
    removeComman,
    geoNearPoint,
    userMiniObj,
    generateRandomPassword,
    axiosRequest,
    generateOTP,
    ObjectId,
    uploadFile
};
