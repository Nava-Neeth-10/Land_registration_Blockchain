var test;
var buyerlist=[];

var sellerlist=[];
var landdetailist=[];
var x;

function submits()
{
   alert("Are you sure?");
   var b1=$('#b1').val();
   var b2=$('#b2').val();
   var b3=$('#b3').val();
   var b4=$('#b4').val();
   var b5=$('#b5').val();
   var b6=$('#b6').val();
   

   var s1=$('#s1').val();
   var s2=$('#s2').val();
   var s3=$('#s3').val();
   var s4=$('#s4').val();
   var s5=$('#s5').val();
   var s6=$('#s6').val();
   

   var l1=$('#l1').val();
   l1=l1.replace("-","/");
   var l2=$('#l2').val();
   var l3=$('#l3').val();
   var l4=$('#l4').val();
   var l5=$('#l5').val();
   var l6=$('#l6').val();
   var l7=$('#l7').val();
   var l8=$('#l8').val();
   var l9=$('#l9').val();
   var l10=$('#l10').val();
   var l11=$('#l11').val();
   var l12=$('#l12').val();
   var l13=$('#l13').val();
   var l14=$('#l14').val();
   var l15=$('#l15').val();
   var l16=$('#l16').val();
   var l17=$('#l17').val();
   


  var buyer=b1+"-"+b2+"-"+b3+"-"+b4+"-"+b5+"-"+b6;
  buyer=buyer.replace(",","_");
  var seller=s1+"-"+s2+"-"+s3+"-"+s4+"-"+s5+"-"+s6;
  seller=seller.replace(",","_");
  var landdetail=l1+"-"+l2+"-"+l3+"-"+l4+"-"+l5+"-"+l6+"-"+l7+"-"+l8+"-"+l9+"-"+l10+"-"+l11+"-"+l12+"-"+l13+"-"+l14+"-"+l15+"-"+l16+"-"+l17;
  landdetail=landdetail.replace(",","_");
  
  buyerlist.push(buyer);
  sellerlist.push(seller);
  landdetailist.push(landdetail);
  window.localStorage.setItem('bl', buyerlist);
   window.localStorage.setItem('sl', sellerlist);
    window.localStorage.setItem('ldd', landdetailist);

};
function views()
{
  var loader = $("#blkdata");
    var content = $("#nrmldata");
    loader.hide();
        content.show();
  var i=$('#landid').val();
  var _buyer = window.localStorage.getItem('bl');
  
  var _seller = window.localStorage.getItem('sl');
  var _landdetail1 = window.localStorage.getItem('ldd');

  var b1=[];
  var s1=[];
  var ldd1=[];  

  var title1=["Name","Address","PinCode","Aadhar Number","Ration ID","Phone Number"];
  var landtitles=["Date","Survey Field Number","Address","City","PinCode","North Neighbour","South Neighbour","East Neighbour","West Neighbour","North Measurement","South Measurement","East Measurement","West Measurement","Total Area","Rate per Sq.Meter","Total Cost in word","Total Cost"];
    alert(_buyer);
   b1=_buyer.split(",");
   s1=_seller.split(",");
   ldd1=_landdetail1.split(",");
  
  var b=b1[i].split("-");
  var s=s1[i].split("-");
  console.error(s);
  var lm=ldd1[i].split("-");

  if(!b.length)
  {
    alert("Data not found");
  }

  var temp,temp1;
  for(var j=1;j<7;j++){
      temp="admin_b"+j;
      temp1="admin_s"+j;
    document.getElementById(temp).innerHTML = title1[j-1]+" : "+b[j-1];
    document.getElementById(temp1).innerHTML = title1[j-1]+" : "+s[j-1];

  }
  for(var j=1;j<=17;j++){
    document.getElementById("admin_l"+j).innerHTML = landtitles[j-1]+" : "+lm[j-1];          
        }

};
