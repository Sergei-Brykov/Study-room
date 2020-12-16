import axios from 'axios'
const axiosPost = axios.create({
  headers: {
    'Content-type': 'application/json'
  },
  method: 'post',
})


const axiosGet = axios.create({
  headers: {
    'Content-type': 'application/json'
  },
  method: 'get',
})

function axiosPrivatPost(url, data) {
  const token = localStorage.getItem('token')

  return axiosPost({ 
    url,
    headers: {
      'x-authorization': token
    },
    data
  })
}


const axiosReq = {
  signIn(data) {
    return axiosPost({
      url: '/api/login',
      data
    })
  },
  conpleteInvitation(data) {
    return axiosPost({
      url: '/api/complete-invitation',
      data,
    })
  },
  completeRecover(data) {
    return axiosPost({
      url: '/api/complete-recover',
      data,
    })
  },
  checkHashRecover(data) {
    return axiosPost({
      url: '/api/check/recover',
      data,
    })
  },
  checkHashInvitation(data) {
    return axiosPost({
      url: '/api/check/invitation',
      data,
    })
  },
  fogotPassword(data) {
    return axiosPost({
      url:'/api/forgot-password',
      data,
    })
  },
  facebookSignIn(data) {
    return axiosPost({
      url:'/api/oauth-facebook-login',
      data,
    })
  },
  googleSignIn(data) {
    return axiosPost({
      url:'/api/oauth-google-login',
      data,
    })
  },
  inviteUser(data, token) {
    return axiosPost({
      url: '/api/invite',
      headers: {
        'x-authorization': token
      },
      data,
    })
  },
  blockUser(data, token) {
    return axiosPost({
      url: '/api/block-user',
      headers: {
        'x-authorization': token
      },
      data,
    })
  },
  unBlockUser(data, token) {
    return axiosPost({
      url: '/api/unblock-user',
      headers: {
        'x-authorization': token
      },
      data,
    })
  },
  setAvatar(data, token) {
    return axios.post(
      '/api/set-avatar',
      data, 
      { headers: { 
        'Content-Type': 'multipart/form-data',
        'x-authorization': token
      }}
    )
  },



  setName(data, token) {
    return axiosPost({
      url: '/api/set-name',
      headers: {
        'x-authorization': token
      },
      data,
    })
  },
  
  facebookOauth(data, token) {
    return axiosPost({
      url: '/api/facebooktoken',
      headers: {
        'x-authorization': token
      },
      data,
    })
  },
  googleOauth(data, token) {
    return axiosPost({
      url: '/api/googletoken',
      headers: {
        'x-authorization': token
      },
      data,
    })
  },
  getAllInvintation(token) {
    return axiosGet({
      url: '/api/get-all-invintation',
      headers: {
        'x-authorization': token
      }
    })
  },
  getAllUsers(token) {
    return axiosGet({
      url: '/api/get-all-users',
      headers: {
        'x-authorization': token
      }
    })
  },
  getAvatar(token) {
    return axiosGet({
      url: '/api/get-avatar',
      headers: {
        'x-authorization': token
      }
    })
  },
  getName(token) {
    return axiosGet({
      url: '/api/get-name',
      headers: {
        'x-authorization': token
      }
    })
  },
}

export default axiosReq