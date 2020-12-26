import axios from 'axios'

class AppApi {
    getNails (data = 1) {
        return axios.get(`nail?page=${data}`).then(response => {
            return response;
        });
    }
    getNailsToday () {
        return axios.get('nailtoday').then(response => {
            return response;
        });
    }
    getNailsPerMonth () {
        return axios.get('nail-per-month').then(response => {
            return response;
        });
    }
    saveNail (data) {
      return axios.put('add-nail', data).then(response => {
          return response;
      });
    }
    updateNail (data) {
        return axios.post('update-nail', data).then(response => {
            return response;
        });
    }
    delNail (data) {
        return axios.delete(`nail/${data}`).then(response => {
            return response;
        });
    }
    findOneNail (data) {
        return axios.get(`find-one/${data}`).then(response => {
            return response;
        });
    }
    saveClient (data) {
        return axios.put('add-client', data).then(response => {
            return response;
        });
    }
    updateClient (data) {
        return axios.post('client', data).then(response => {
            return response;
        });
    }
    getListClients (data = 1) {
        return axios.get(`client?page=${data}`).then(response => {
            return response;
        });
    }
    getAllClients () {
        return axios.get('all-clients').then(response => {
            return response;
        });
    }
    delClient (data) {
        return axios.delete(`client/${data}`).then(response => {
            return response;
        });
    }
}

export let appApi = new AppApi()
