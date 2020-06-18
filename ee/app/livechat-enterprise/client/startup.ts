import { Meteor } from 'meteor/meteor';

import { MultipleBusinessHours } from './views/business-hours/MultipleBusinessHours';
import { SingleBusinessHour } from '../../../../app/livechat/client/views/app/business-hours/Single';
import { settings } from '../../../../app/settings/client';
import { businessHourManager } from '../../../../app/livechat/client/views/app/business-hours/BusinessHours';
import { IBusinessHour } from '../../../../app/livechat/client/views/app/business-hours/IBusinessHour';
import {
	addCustomFormTemplate,
	removeCustomTemplate,
} from '../../../../app/livechat/client/views/app/customTemplates/register';
import { LivechatBussinessHourTypes } from '../../../../definition/ILivechatBusinessHour';

const businessHours: Record<string, IBusinessHour> = {
	Multiple: new MultipleBusinessHours(),
	Single: new SingleBusinessHour(),
};

Meteor.startup(function() {
	settings.onload('Livechat_business_hour_type', (_, value) => {
		removeCustomTemplate('livechatBusinessHoursForm');
		if (value === LivechatBussinessHourTypes.MULTIPLE) {
			addCustomFormTemplate('livechatBusinessHoursForm', 'businessHoursCustomFieldsForm');
		}
		businessHourManager.registerBusinessHourMethod(businessHours[value as string]);
	});
});
