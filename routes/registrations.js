
/*
 * GET users listing.
 */
var dateonly = require('date-only');
var moment = require('moment-timezone');

exports.list = function(req, res){
    
    console.log("All the data")
     console.log("All the data")

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM registration',function(err,rows)
        {
            
            if(err){
                console.log("Error Selecting : %s ",err );
            } else {
                rows.forEach(function(obj){

            var a = moment.tz(obj.dob, "YYYY-MM-DD", "Asia/Kolkata");
            obj.formatedDate = a.format("YYYY-MM-DD");

                
            res.render('registrations',{page_title:"registrations - Node.js",data:rows});
           
        });
        } 
         //console.log(query.sql);
    });
  
});
}

exports.add = function(req, res){
  res.render('add_newregister',{page_title:"Add registrations - Node.js"});
};
       
           
exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM registration WHERE id = ?',[id],function(err,rows)
        {

            
            if(err){
                console.log("Error Selecting : %s ",err );
		} else{
		
		var normalDate = new Date(rows[0].dob);
		var dateOnly = new dateonly(normalDate);
		var userdob = JSON.parse(JSON.stringify(dateOnly));
     
            res.render('edit_registration',{page_title:"Edit registrations - Node.js",userdob:userdob, data:rows});
         
         }
         
         //console.log(query.sql);
    })
});
}
/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
     
    req.getConnection(function (err, connection) {
        
        var data = {
            
            fname    : input.fname,
            lname    : input.lname,
            dob    	 : input.dob,
            gender   : input.gender,
            address  : input.address
           
        
        };

        console.log(data);
        
        var query = connection.query("INSERT INTO registration set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/registrations');

          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            fname    : input.fname,
            lname    : input.lname,
            dob    	 : input.dob,
            gender    : input.gender,
            address : input.address
        
        };
         console.log(data);
        
        connection.query("UPDATE registration set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
          console.log(rows)
         
          res.redirect('/registrations');
          
        });
    
    });
};


exports.delete_register = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
       
        
        connection.query("DELETE FROM registration  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
               console.log(rows);
            
             res.redirect('/registrations');
             
        });
        
     });
};


