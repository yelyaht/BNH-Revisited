  const CHOICES = ["Bear","Ninja","Hunter"];
  let playerWins = 0, computerWins = 0;

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  function computerPick(){ return CHOICES[Math.floor(Math.random()*CHOICES.length)]; }

  function determineWinner(p, c){
    if (p===c) return "tie";
    if ((p==="Bear"&&c==="Ninja")||(p==="Ninja"&&c==="Hunter")||(p==="Hunter"&&c==="Bear")) return "player";
    return "computer";
  }

  function showInitial(){
    $("#results").classList.add("hidden");
    $("#counter").classList.add("hidden");
    $("#againBtn").classList.add("hidden");
    $("#endBtn").classList.add("hidden");
  }

  function showRound(p, c, out){
    const res = $("#results");
    res.classList.remove("hidden");

    $("#roundText").textContent = out==="tie" ? "It's a tie!" : (out==="player" ? "You win!" : "Computer wins!");
    $("#detailText").textContent = `You chose ${p}; the computer chose ${c}.`;

    $("#counter").classList.remove("hidden");
    $("#playerWins").textContent = playerWins;
    $("#computerWins").textContent = computerWins;

    $("#againBtn").classList.remove("hidden");
    $("#endBtn").classList.remove("hidden");
  }

  $$(".choice").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const p = btn.dataset.choice;
      const c = computerPick();

      switch(p){ case "Bear": case "Ninja": case "Hunter": break; default: return; }

      const out = determineWinner(p,c);
      if (out==="player") playerWins++; else if (out==="computer") computerWins++;
      showRound(p,c,out);
    });
  });

  $("#againBtn").addEventListener("click", showInitial);
  $("#endBtn").addEventListener("click", ()=>{
    if (confirm("End session and clear the win counter?")){
      playerWins = computerWins = 0;
      $("#playerWins").textContent = "0";
      $("#computerWins").textContent = "0";
      showInitial();
    }
  });

  showInitial();
