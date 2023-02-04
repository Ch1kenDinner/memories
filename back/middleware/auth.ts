import jwt from 'jsonwebtoken'

export const tokenAuth = (req, res, next) => {
	const token = req.headers.auth
	try {
		const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET!) as any
		req.userId = decoded?.id
		next();
	} catch(err) {
		return res.status(401).json({mess: 'Not authorized'})
	}
}