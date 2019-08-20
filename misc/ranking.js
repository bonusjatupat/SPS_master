export const toMatrix = (parking) => {  // step 1 to evaluate
	var parkingRating = [];

	for (let i = 0; i < parking.length; i++) {
		// Free Slot
		let freeSlot = 0;
		if (parking[i].available > 0) {
			freeSlot = parking[i].slotCounter.availableSlot;
		}
		// if( isNaN(freeSlot) ) freeSlot = 0;
		// Find Avg of Review

		let maxScore = 5;
		let maxReviewScore = maxScore * parking[i].review.length;
		if (maxReviewScore == 0)
			maxReviewScore = 1;  // prevent NaN

		let sumReview = parking[i].review.reduce((sum, p) => sum + p.star, 0);  // summation of star

		// sum of facilities
		let fac = parking[i].facility;
		let sumFac = 0;
		let allFac = ['indoor', 'coffee', 'restaurant', 'wifi', 'carwash', 'security'];

		if (fac) {
			for (let j = 0; j < allFac.length; j++) {
				sumFac += (fac[allFac[j]]) ? 1 : 0;
			}
		}

		// check price
		let freePrice = 0;
		let paidPrice = 0;
		if (parking[i].price != null) {
			if (parking[i].price.paid) {
				paidPrice = parking[i].price.paid.rate;
			} else {
				freePrice = parking[i].price.free;
			}
		}

		let distance = 0;
    	if (parking[i].distance != null) {
			distance = parking[i].distance;
		}
		parkingRating.push({
			_id: parking[i]._id,
			name: parking[i].name,
			review: sumReview / maxReviewScore,
			facility: sumFac,
			slotFree: freeSlot,
			freePrice: freePrice,
			paidPrice: paidPrice,
			distance: distance
		});
	}

	//console.log(parkingRating);
	return parkingRating;
}

export const normalization = (parking) => {
	parking = toMatrix(parking);
	let sosReview = 0; // sos = sum of square
	let sosFacilities = 0;
	let sosSlotFree = 0;
	let sosFreePrice = 0;
	let sosPaidPrice = 0;
	let sosDistance = 0;

	for (let i = 0; i < parking.length; ++i) {
		sosReview += parking[i].review * parking[i].review;
		sosFacilities += parking[i].facility * parking[i].facility;
		sosSlotFree += parking[i].slotFree * parking[i].slotFree;
		sosFreePrice += parking[i].freePrice * parking[i].freePrice;
		sosPaidPrice += parking[i].paidPrice * parking[i].paidPrice;
		sosDistance += parking[i].distance * parking[i].distance;
	}

	sosReview = Math.sqrt(sosReview);
	sosFacilities = Math.sqrt(sosFacilities);
	sosSlotFree = Math.sqrt(sosSlotFree);
	sosFreePrice = Math.sqrt(sosFreePrice);
	sosPaidPrice = Math.sqrt(sosPaidPrice);
	sosDistance = Math.sqrt(sosDistance);

	// prevent NaN
	if (sosReview == 0)
		sosReview = 1;
	if (sosFacilities == 0)
		sosFacilities = 1;
	if (sosSlotFree == 0)
		sosSlotFree = 1;
	if (sosFreePrice == 0)
		sosFreePrice = 1;
	if (sosPaidPrice == 0)
		sosPaidPrice = 1;
	if (sosDistance == 0)
		sosDistance = 1;

	for (let i = 0; i < parking.length; ++i) {
		parking[i].review = parking[i].review / sosReview;
		parking[i].facility = parking[i].facility / sosFacilities;
		parking[i].slotFree = parking[i].slotFree / sosSlotFree;
		parking[i].freePrice = parking[i].freePrice / sosFreePrice;
		parking[i].paidPrice = parking[i].paidPrice / sosPaidPrice;
		parking[i].distance = parking[i].distance/ sosDistance;
	}

	//console.log(parking);
	return parking;
}

export const weightDecision = (parking) => {
	parking = normalization(parking);

	let weightReview    = 0.05;
	let weightFacility  = 0.05;
	let weightSlotFree  = 0.1;
	let weightFreePrice = 0.25;
	let weightPaidPrice = 0.45;
	let weightDistance  = 0.1;

	for (let i = 0; i < parking.length; ++i) {
		parking[i].review = parking[i].review * weightReview;
		parking[i].facility = parking[i].facility * weightFacility;
		parking[i].slotFree = parking[i].slotFree * weightSlotFree;
		parking[i].freePrice = parking[i].freePrice * weightFreePrice;
		parking[i].paidPrice = parking[i].paidPrice * weightPaidPrice;
		parking[i].distance = parking[i].distance * weightDistance;
	}

	return parking;
}

export const idealSolution = (parking) => { // Step 4 -> 7
	//console.log(parking);
	let oldParking = parking;
	parking = weightDecision(parking);
  //
	// console.log( "Old Parking" );
	// console.log( oldParking );
  //
	// console.log( "Parking" );
	// console.log( parking );

	let check = { // for greater or lower
		review: "greater",
		facility: "greater",
		slotFree: "greater",
		freePrice: "greater",
		paidPrice: "lesser",
		distance: "lesser"
	}

	let worstCase = {
		name: "WorstCase",
		review: 0,
		facility: 0,
		slotFree: 0,
		freePrice: 0,
		paidPrice: 0,
		distance: 0
	};

	let bestCase = {
		name: "BestCase",
		review: 0,
		facility: 0,
		slotFree: 0,
		freePrice: 0,
		paidPrice: 0,
		distance: 0
	};

	for (let key in check) {
		for (let i = 0; i < parking.length; ++i) {
			if (i == 0) {
				worstCase[key] = parking[i][key];
				bestCase[key] = parking[i][key];
			} else { // greater case
				if (check[key] == "greater") {
					if (parking[i][key] > bestCase[key]) {
						bestCase[key] = parking[i][key];
					} else if (parking[i][key] < worstCase[key]) {
						worstCase[key] = parking[i][key];
					}
				} else { // lesser case
					if (parking[i][key] < bestCase[key]) {
						bestCase[key] = parking[i][key];
					} else if (parking[i][key] > worstCase[key]) {
						worstCase[key] = parking[i][key];
					}
				}
			}
		}
	}

	// sP = seperation measures from ideal Positive , N = negative
	var newParking = [];

	for (let i = 0; i < parking.length; ++i) {
		let sP = 0;
		let sN = 0;
		for (let key in check) {
			sP += Math.pow(parking[i][key] - bestCase[key], 2);
			sN += Math.pow(parking[i][key] - worstCase[key], 2);
		}
		sP = Math.sqrt(sP);
		sN = Math.sqrt(sN);
		oldParking[i].closeness =  sN / (sP + sN);
	}
	oldParking.sort((a,b) => {
		let ac = a.closeness;
		let bc = b.closeness;
		if( isNaN(parseFloat(ac)) ) ac = 0;
		if( isNaN(parseFloat(bc)) ) bc = 0;
		return (ac > bc) ? -1 : (bc < ac) ? 1 : 0;  // sort from high to low
	});
	//console.log("After Sorting");
	//console.log(oldParking);

	return oldParking;
}
