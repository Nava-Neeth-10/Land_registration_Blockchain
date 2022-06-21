App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        console.error(account);
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
  viewblk: function(){
    // Load contract data
    var electionInstance;
    var loader = $("#blkdata");
    var content = $("#nrmldata");
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;

      return electionInstance.registerCount();
    }).then(function(registerCount) {

      var buyerrow = $("#buyerrow");
      buyerrow.empty();
      var sellerrow = $("#sellerrow");
      sellerrow.empty();
      var landrow = $("#landrow");
      landrow.empty();

      var i=parseInt($('#landidblk').val());
      

      electionInstance.landr(i).then(function(candidate) {
      
        var text = candidate;
        var temp=[];
        temp=text.split("-_-");
        var b1=[];
        var s1=[];
        var ldd1=[];
        b1=temp[0].split("-");
        s1=temp[1].split("-");
        ldd1=temp[2].split("-");
        // Render candidate Result
        for(var j=0;j<b1.length;j++)
        {
          var candidateTemplate = "<tr><td>" + b1[j] + "</td></tr>"
          buyerrow.append(candidateTemplate);
        }
        for(var j=0;j<s1.length;j++)
        {
          var candidateTemplate = "<tr><td>" + s1[j] + "</td></tr>"
          sellerrow.append(candidateTemplate);
        }
        for(var j=0;j<ldd1.length;j++)
        {
          var candidateTemplate = "<tr><td>" + ldd1[j] + "</td></tr>"
          landrow.append(candidateTemplate);
        }
        loader.show();
        content.hide();
        
        
      });
      
      return electionInstance.voters(App.account);
    });
  },
  uploads: function() {

  var i=$('#landid').val();
  
  var _buyer = window.localStorage.getItem('bl');

  var _seller = window.localStorage.getItem('sl');
  var _landdetail1 = window.localStorage.getItem('ldd');
  var b1=[];
  var s1=[];
  var ldd1=[];
   b1=_buyer.split(",");
  alert(b1[i]);
   s1=_seller.split(",");
   ldd1=_landdetail1.split(",");
   var final=b1[i]+"-_-"+s1[i]+"-_-"+ldd1[i];

    App.contracts.Election.deployed().then(function(instance) {
      return instance.submit(final, { from: App.account,gas: "3000000"});
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
