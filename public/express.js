document.addEventListener('alpine:init', () => {

    Alpine.data('totalphonebillWidget', () => {
        return{
            plan: '',
            usage: '',
            new_plan_name: '',
            new_sms_price: '',
            new_call_price: '',
            pricePlans: [],
            updatePlanName: '',
            updateSMSPrice: '',
            updateCallPrice: '',
            deletePlanName: '',
            billMessage: '',
            myPlans: [],
            showTable: false,
            showFirstSection: false,

            init(){
                axios.get('http://localhost:4011/api/price_plan')
                .then((result) => {
                    this.pricePlans = result.data.price_plans;
           
          }).catch((err) => {
            console.err("Cannot Get api/price_plan");
                   
                });
            },

            calculateBill(){
                axios.post('http://localhost:4011/api/phonebill', {

                    price_plan: this.plan.toLowerCase(),
                    actions: this.usage.toLowerCase()
                })
                .then((result) => {
                    if(result.data.error){
                        alert(result.data.error);
                    }
                    this.billMessage = result.data.total;
                    setTimeout(()=>{
                        this.billMessage='';
                        this.plan = '';
                        this.usage = '';
                    },3000);
                   
                });
               
            },

            createPlan(){
                axios.post("http://localhost:4011/api/price_plan/create", {

                    plan_name: this.new_plan_name.toLowerCase(),
                    sms_price: parseFloat(this.new_sms_price).toFixed(2),
                    call_price: parseFloat(this.new_call_price).toFixed(2)
                })
                .then(result => {
                    if(result.data.error){
                        alert(result.data.error);
                        setTimeout(()=>{
                            this.new_plan_name ='';
                            this.new_sms_price = '';
                            this.new_call_price = '';
                        },3000);
                    }
                    else{
                        alert(result.data.status);
                        location.reload();
                        setTimeout(()=>{
                            this.new_plan_name ='';
                            this.new_sms_price = '';
                            this.new_call_price = '';
                        },3000);
                    }
                });
            },

            updatePlan(){
                axios.post("http://localhost:4011/api/price_plan_update", {

                    plan_name: this.updatePlanName.toLowerCase(),
                    sms_price: parseFloat(this.updateSMSPrice).toFixed(2),
                    call_price: parseFloat(this.updateCallPrice).toFixed(2)
                })
                .then(result => {
                    if(result.data.status){
                        alert(result.data.status);
                    location.reload();
                    setTimeout(()=>{
                        this.updatePlanName='';
                        this.updateSMSPrice = '';
                        this.updateCallPrice = '';
                    },3000);
                    }
                    else{
                        alert(result.data.error)
                        setTimeout(()=>{
                            this.updatePlanName='';
                            this.updateSMSPrice = '';
                            this.updateCallPrice = '';
                        },3000);
                    }

                });
            },

            deletePlan(){
                axios.post("http://localhost:4011/api/price_plan/delete", {

                    plan_name : this.deletePlanName.toLowerCase()
                })
                .then(result => {
                    if(result.data.status){
                        alert(result.data.status);
                        location.reload();
                    setTimeout(()=>{
                        this.deletePlanName='';
                    },3000);
                    }
                    else{
                        alert(result.data.error);
                        setTimeout(()=>{
                            this.deletePlanName='';
                        },3000);
                    }
                });
            }
        }
    })
})