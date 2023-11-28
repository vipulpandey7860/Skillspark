exports.sendtoken = (student, statusCode, res) => {
    const token = student.getjwtToken();

    const option = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure:true
    };

    res.status(statusCode)
        .cookie('token', token, option)
        .json({

            success: true,
            id: student._id,
            token,
        });


    res.json({ token });
}