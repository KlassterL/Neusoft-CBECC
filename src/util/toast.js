import app from '@/app'
const getToast = () => app.config.globalProperties.$toast

const toast = {
	add(param) {
		getToast().add(param)
	}
}

function success(summary, message) {
    toast.add({severity:'success', summary:summary, detail:message, life:3000});
}

function error(summary, message) {
    toast.add({severity:'error', summary:summary, detail:message, life:3000});
}

function info(summary, message) {
    toast.add({severity:'info', summary:summary, detail:message, life:3000});
}

function warn(summary, message) {
    toast.add({severity:'warn', summary:summary, detail:message, life:3000});
}

export default {
    success,
    error,
    info,
    warn
}